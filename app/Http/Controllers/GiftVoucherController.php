<?php

namespace App\Http\Controllers;

use App\Services\GiftVoucherApiService;
use App\Services\CouponService; // ✅ EKLENDİ
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class GiftVoucherController extends Controller
{
    private const CACHE_PREFIX = 'gift_voucher_controller_v2';
    private const CACHE_VERSION_KEY = 'gift_voucher_controller_version';
    private const CACHE_TTL = 300;

    public function __construct(
        private GiftVoucherApiService $billing,
        private CouponService $couponService, // ✅ EKLENDİ
    ) {}

    /**
     * @return array<string, mixed>
     */
    private function sharedPayload(string $locale): array
    {
        $locale = strtolower($locale);
        $cacheKey = self::CACHE_PREFIX . ':shared:' . $locale . ':v' . $this->cacheVersion();

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($locale) {
            $companiesRaw = $this->billing->getCompaniesRaw();

            return [
                'locale' => $locale,
                'currentRoute' => 'gutschein',
                'companies' => $this->billing->getCompaniesPublic(),
                'defaultCompanyId' => $this->billing->resolveCompanyId(),
                'paymentMethods' => $this->billing->getPaymentMethodsPublic(),

                // ✅ BURASI EKLENDİ
                'coupons' => $this->couponService->getCoupons(),

                'billingApi' => [
                    'ok' => empty($companiesRaw['_error']),
                    'message' => $companiesRaw['message'] ?? ($companiesRaw['_error'] ?? null),
                    'error' => $companiesRaw['_error'] ?? null,
                    'status' => $companiesRaw['status'] ?? null,
                    'requestUrl' => $companiesRaw['request_url'] ?? null,
                    'details' => $companiesRaw['response_body'] ?? null,
                ],
            ];
        });
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

    public function invoicePage(string $locale, string $invoice): Response
    {
        return Inertia::render('GiftVoucher/Invoice', array_merge(
            $this->sharedPayload($locale),
            [
                'invoiceRef' => $invoice,
                'invoice' => $this->billing->getInvoicePublic($invoice),
            ]
        ));
    }

    public function companiesJson(): JsonResponse
    {
        $cacheKey = self::CACHE_PREFIX . ':companies:v' . $this->cacheVersion();
        $data = Cache::remember($cacheKey, self::CACHE_TTL, function () {
            return [
                'data' => $this->billing->getCompaniesPublic(),
                'payment_methods' => $this->billing->getPaymentMethodsPublic(),
            ];
        });

        return response()->json($data);
    }

    public function invoicesJson(Request $request): JsonResponse
    {
        $query = array_filter($request->query(), fn ($v) => $v !== null && $v !== '');
        $cacheKey = self::CACHE_PREFIX . ':invoices:' . md5(json_encode([
            'version' => $this->cacheVersion(),
            'query' => $query,
        ]));

        $data = Cache::remember($cacheKey, self::CACHE_TTL, function () use ($query) {
            return [
                'data' => $this->billing->getInvoicesPublic($query),
            ];
        });

        return response()->json($data);
    }

    public function invoiceShow(Request $request, string $invoice): JsonResponse
    {
        $query = array_filter($request->query(), fn ($v) => $v !== null && $v !== '');
        $cacheKey = self::CACHE_PREFIX . ':invoice:' . md5(json_encode([
            'version' => $this->cacheVersion(),
            'invoice' => $invoice,
            'query' => $query,
        ]));

        $data = Cache::remember($cacheKey, self::CACHE_TTL, function () use ($invoice, $query) {
            return $this->billing->getInvoicePublic($invoice, $query);
        });

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
        $this->bumpCacheVersion();

        return response()->json([
            'message' => $result['message'] ?? 'Invoice created successfully',
            'data' => $invoiceData,
            'invoice' => $invoice,
        ], $status >= 200 && $status < 300 ? $status : 201);
    }

    private function cacheVersion(): int
    {
        return (int) Cache::get(self::CACHE_VERSION_KEY, 1);
    }

    private function bumpCacheVersion(): void
    {
        if (! Cache::has(self::CACHE_VERSION_KEY)) {
            Cache::forever(self::CACHE_VERSION_KEY, 1);
        }

        Cache::increment(self::CACHE_VERSION_KEY);
    }
}
