<?php

namespace App\Http\Controllers;

use App\Services\GiftVoucherApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class GiftVoucherController extends Controller
{
    public function __construct(
        private GiftVoucherApiService $billing,
    ) {}

    /**
     * @return array<string, mixed>
     */
    private function sharedPayload(string $locale): array
    {
        $locale = strtolower($locale);
        $companiesRaw = $this->billing->getCompaniesRaw();

        return [
            'locale' => $locale,
            'currentRoute' => 'gutschein',
            'companies' => $this->billing->getCompaniesPublic(),
            'defaultCompanyId' => $this->billing->resolveCompanyId(),
            'paymentMethods' => $this->billing->getPaymentMethodsPublic(),
            'billingApi' => [
                'ok' => empty($companiesRaw['_error']),
                'message' => $companiesRaw['message'] ?? ($companiesRaw['_error'] ?? null),
                'error' => $companiesRaw['_error'] ?? null,
                'status' => $companiesRaw['status'] ?? null,
                'requestUrl' => $companiesRaw['request_url'] ?? null,
                'details' => $companiesRaw['response_body'] ?? null,
            ],
        ];
    }

    public function index(string $locale): Response
    {
        return Inertia::render('GiftVoucher/Index', $this->sharedPayload($locale));
    }

    public function stripe(string $locale): Response
    {
        return Inertia::render('GiftVoucher/CheckoutStripe', array_merge(
            $this->sharedPayload($locale),
            ['checkoutMethod' => 'stripe']
        ));
    }

    public function paypal(string $locale): Response
    {
        return Inertia::render('GiftVoucher/CheckoutPaypal', array_merge(
            $this->sharedPayload($locale),
            ['checkoutMethod' => 'paypal']
        ));
    }

    public function sepa(string $locale): Response
    {
        return Inertia::render('GiftVoucher/CheckoutSepa', array_merge(
            $this->sharedPayload($locale),
            ['checkoutMethod' => 'sepa']
        ));
    }

    /**
     * Uzak API: GET /v1/companies — güvenli özet + ödeme yöntemleri.
     */
    public function companiesJson(): JsonResponse
    {
        return response()->json([
            'data' => $this->billing->getCompaniesPublic(),
            'payment_methods' => $this->billing->getPaymentMethodsPublic(),
        ]);
    }

    /**
     * Uzak API: GET /v1/invoices — sorgu parametreleri aynen iletilir.
     * (Gutschein-UI listelemez; Rechnung nach erfolgreicher Zahlung / eigener Route.)
     */
    public function invoicesJson(Request $request): JsonResponse
    {
        $query = array_filter($request->query(), fn ($v) => $v !== null && $v !== '');

        return response()->json([
            'data' => $this->billing->getInvoicesPublic($query),
        ]);
    }

    public function invoiceShow(Request $request, string $invoice): JsonResponse
    {
        $query = array_filter($request->query(), fn ($v) => $v !== null && $v !== '');
        $data = $this->billing->getInvoicePublic($invoice, $query);

        if (! $data) {
            return response()->json([
                'message' => 'Invoice not found',
            ], 404);
        }

        return response()->json([
            'data' => $data,
        ]);
    }

    public function createInvoice(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'company_id' => ['nullable', 'integer'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'total_amount' => ['required', 'numeric', 'min:0.01'],
            'amount' => ['nullable', 'numeric', 'min:0.01'],
            'quantity' => ['nullable', 'integer', 'min:1'],
            'payment_method' => ['required', Rule::in(['stripe', 'paypal', 'sepa'])],
            'message' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $result = $this->billing->createInvoice($validated);
        $status = (int) ($result['status'] ?? 201);

        if (! empty($result['_error'])) {
            return response()->json([
                'message' => $result['message'] ?? 'Invoice could not be created.',
                'error' => $result['_error'],
                'details' => $result['response_body'] ?? null,
            ], $status >= 400 ? $status : 422);
        }

        $invoiceData = is_array($result['data'] ?? null) ? $result['data'] : [];
        $invoiceRef = $invoiceData['id'] ?? $invoiceData['invoice_number'] ?? null;
        $invoice = $invoiceRef ? $this->billing->getInvoicePublic((string) $invoiceRef) : null;

        return response()->json([
            'message' => $result['message'] ?? 'Invoice created successfully',
            'data' => $invoiceData,
            'invoice' => $invoice,
        ], $status >= 200 && $status < 300 ? $status : 201);
    }
}
