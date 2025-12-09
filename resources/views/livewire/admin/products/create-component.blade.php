<main class="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100 no-scrollbar">
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Create Product</h1>
                <p class="text-sm text-gray-600 mt-1">
                    Manage and organize your badge categories
                </p>
            </div>

            <div class="flex items-center gap-3 flex-wrap">
                <button type="button"
                    class="bg-white text-gray-500 hover:text-orange-500 active:scale-95 transition-all duration-200 text-sm flex items-center px-3 sm:px-4 py-2 gap-2 rounded border border-gray-300">
                    <!-- Inline Excel SVG -->
                    <img src="assets/img/icons/excel.svg" alt="" />
                    <span class="hidden sm:inline">Export Excel</span>
                </button>
                <button type="button"
                    class="bg-white text-gray-500 hover:text-orange-500 active:scale-95 transition-all duration-200 text-sm flex items-center px-3 sm:px-4 py-2 gap-2 rounded border border-gray-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            d="M12 5v14M5 12h14" />
                    </svg>
                    <span class="hidden sm:inline">Back to Products</span>
                </button>
            </div>
        </div>

        <!-- add product Card -->
        <div x-data="{ open: true }" class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <!-- Header -->
            <button @click="open = !open"
                class="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="font-semibold text-gray-800 text-lg">Product Information</span>
                </div>

                <!-- Arrow Icon -->
                <svg class="w-5 h-5 text-gray-600 transition-transform duration-300"
                    :class="open ? 'rotate-180' : 'rotate-0'" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            <!-- Body -->
            <div x-show="open" x-collapse.duration.300ms class="p-4 space-y-4">
                <!-- Top checkbox section -->
                <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-0 flex flex-wrap items-center gap-4">
                    <label class="flex items-center gap-2 text-sm">
                        <input type="checkbox" class="form-checkbox h-4 w-4 text-orange-500" checked /> Warranties
                    </label>
                    <label class="flex items-center gap-2 text-sm">
                        <input type="checkbox" class="form-checkbox h-4 w-4 text-orange-500" /> Manufacturer
                    </label>
                    <label class="flex items-center gap-2 text-sm">
                        <input type="checkbox" class="form-checkbox h-4 w-4 text-orange-500" /> Expiry
                    </label>
                </div>

                <!-- Form Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Left column -->
                    <div class="space-y-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium">Store *</label>
                            <select
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                name="store">
                                <option value="">Select</option>
                                <option value="main" selected>Main Store</option>
                                <option value="online">Online Store</option>
                                <option value="warehouse-1">Warehouse Outlet</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Product Name *</label>
                            <input type="text" name="product_name" value="Sample Product A"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>

                        <div class="flex gap-3 items-start">
                            <div class="flex-1">
                                <label class="block mb-1 text-sm font-medium">SKU *</label>
                                <input type="text" name="sku" value="SKU-000123"
                                    class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div class="shrink-0">
                                <button type="button"
                                    class="mt-6 px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">Generate</button>
                            </div>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Category *</label>
                            <select name="category"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Select</option>
                                <option value="electronics" selected>Electronics</option>
                                <option value="apparel">Apparel</option>
                                <option value="home">Home & Kitchen</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Brand *</label>
                            <select name="brand"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Select</option>
                                <option value="brand-a" selected>Brand A</option>
                                <option value="brand-b">Brand B</option>
                                <option value="brand-c">Brand C</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Barcode Symbology *</label>
                            <select name="barcode_symbology"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Select</option>
                                <option value="ean13">EAN-13</option>
                                <option value="upc" selected>UPC-A</option>
                                <option value="code128">Code 128</option>
                            </select>
                        </div>

                        <div class="flex gap-3 items-start">
                            <div class="flex-1">
                                <label class="block mb-1 text-sm font-medium">Item Barcode *</label>
                                <input type="text" name="item_barcode" value="012345678901"
                                    class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div class="shrink-0">
                                <button type="button"
                                    class="mt-6 px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">Generate</button>
                            </div>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Description</label>
                            <textarea rows="4" name="description"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">This is a sample product description. Maximum 60 words.</textarea>
                        </div>
                    </div>

                    <!-- Right column -->
                    <div class="space-y-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium">Warehouse *</label>
                            <select name="warehouse"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Select</option>
                                <option value="wh-1" selected>Warehouse 1</option>
                                <option value="wh-2">Warehouse 2</option>
                                <option value="drop-ship">Drop Shipping</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Slug *</label>
                            <input type="text" name="slug" value="sample-product-a"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Selling Type *</label>
                            <select name="selling_type"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Select</option>
                                <option value="retail" selected>Retail</option>
                                <option value="wholesale">Wholesale</option>
                                <option value="digital">Digital</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Sub Category *</label>
                            <select name="sub_category"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Select</option>
                                <option value="mobile" selected>Mobile Phones</option>
                                <option value="laptops">Laptops</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Unit *</label>
                            <select name="unit"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Select</option>
                                <option value="pcs" selected>pcs</option>
                                <option value="box">box</option>
                                <option value="kg">kg</option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 text-sm font-medium">Barcode Symbology (Alt)</label>
                            <select name="barcode_symbology_alt"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="">Choose</option>
                                <option value="ean8">EAN-8</option>
                                <option value="code39" selected>Code 39</option>
                                <option value="itf">ITF</option>
                            </select>
                        </div>

                        <!-- Warranty / Manufacturer / Dates -->
                        <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                            <div>
                                <label class="block mb-1 text-sm font-medium">Warranty *</label>
                                <select name="warranty"
                                    class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                    <option value="">Select</option>
                                    <option value="no-warranty">No Warranty</option>
                                    <option value="6-month" selected>6 Months</option>
                                    <option value="1-year">1 Year</option>
                                    <option value="2-year">2 Years</option>
                                </select>
                            </div>

                            <div>
                                <label class="block mb-1 text-sm font-medium">Manufacturer *</label>
                                <input type="text" name="manufacturer" value="Manufacturer Co."
                                    class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label class="block mb-1 text-sm font-medium">Manufactured Date *</label>
                                    <input type="date" name="manufactured_date" value="2025-01-01"
                                        class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div>
                                    <label class="block mb-1 text-sm font-medium">Expiry On *</label>
                                    <input type="date" name="expiry_date" value="2027-01-01"
                                        class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Footer actions -->
                <div class="flex items-center justify-end gap-3">
                    <button type="button"
                        class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Save
                        Product</button>
                </div>
            </div>
        </div>

        <div x-data="{ open: true, productType: 'single' }" class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <!-- header omitted for brevity -->
            <!-- Body -->
            <div x-show="open" x-collapse.duration.300ms class="p-4 space-y-4">

                <!-- Product type radios (unchanged) -->
                <div class="flex items-center gap-6">
                    <label class="text-sm font-medium block">Product Type *</label>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-2 text-sm">
                            <input type="radio" name="product_type" value="single" x-model="productType"
                                class="h-4 w-4" />
                            <span>Single Product</span>
                        </label>
                        <label class="flex items-center gap-2 text-sm">
                            <input type="radio" name="product_type" value="variable" x-model="productType"
                                class="h-4 w-4" />
                            <span>Variable Product</span>
                        </label>
                    </div>
                </div>

                <!-- GRID: Show this whole grid only for single products -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6" x-show="productType === 'single'" x-cloak
                    x-collapse>
                    <!-- Quantity -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Quantity *</label>
                        <input type="number" name="quantity" value="50" :disabled="productType !== 'single'"
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                    </div>

                    <!-- Price -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Price *</label>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sm text-gray-500">
                                $</div>
                            <input type="text" :name="productType === 'single' ? 'price' : ''" value="29.99"
                                :disabled="productType !== 'single'"
                                class="w-full pl-8 border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>
                    </div>

                    <!-- Tax Type -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Tax Type *</label>
                        <select name="tax_type" :disabled="productType !== 'single'"
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                            <option value="">Select</option>
                            <option value="inclusive" selected>Inclusive</option>
                            <option value="exclusive">Exclusive</option>
                        </select>
                    </div>

                    <!-- Tax Rate -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Tax Rate *</label>
                        <select name="tax_rate" :disabled="productType !== 'single'"
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                            <option value="">Select</option>
                            <option value="10%" selected>10%</option>
                            <option value="20%">20%</option>
                            <option value="30%">30%</option>
                        </select>
                    </div>

                    <!-- Product Type -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Discount Type *</label>
                        <select name="product_type" wire:model="productType"
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                            <option value="fixed">Fixed</option>
                            <option value="percentage">Percentage</option>
                        </select>
                    </div>
                    <!-- Discount Type -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Discount Amount *</label>
                        <input type="number" name="discount_amount" wire:model="discountAmount"
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                    </div>
                    <!-- Alert quantity -->
                    <div>
                        <label class="block mb-1 text-sm font-medium">Alert Quantity *</label>
                        <input type="number" name="alert_quantity" wire:model="alertQuantity"
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500">
                    </div>
                </div>
                <!-- Variant Attributes -->
                <div x-show="productType === 'variable'" x-cloak x-collapse class="space-y-3">
                    <!-- everything inside x-data, no separate script tag -->
                    <div class="space-y-3" x-data="{
                        open: false,
                        enabled: false,
                        colors: [
                            { name: 'AliceBlue', code: '#F0F8FF' },
                            { name: 'Amethyst', code: '#9966CC' },
                            { name: 'AntiqueWhite', code: '#FAEBD7' },
                            { name: 'Aqua', code: '#00FFFF' },
                            { name: 'Aquamarine', code: '#7FFFD4' }
                        ],
                        selected: [],
                        variants: {},
                    
                        init() {
                            this.$watch('selected', value => {
                                value.forEach(c => {
                                    if (!this.variants[c]) {
                                        this.variants = {
                                            ...this.variants,
                                            [c]: { color: c, value: '', sku: '', qty: 1, price: 0, note: '', imageFile: null }
                                        }
                                    }
                                })
                    
                                Object.keys(this.variants).forEach(k => {
                                    if (!value.includes(k)) {
                                        const {
                                            [k]: _, ...rest
                                        } = this.variants
                                        this.variants = rest
                                    }
                                })
                            })
                        },
                    
                        selectedSummary() {
                            if (this.selected.length === 0) return 'Select colors'
                            if (this.selected.length === 1) return this.selected[0]
                            return `${this.selected[0]} +${this.selected.length - 1}`
                        },
                    
                        incrementQty(color) {
                            if (!this.enabled) return
                            this.variants[color].qty++
                        },
                        decrementQty(color) {
                            if (!this.enabled) return
                            this.variants[color].qty = Math.max(0, this.variants[color].qty - 1)
                        },
                        removeColor(color) {
                            if (!this.enabled) return
                            this.selected = this.selected.filter(c => c !== color)
                        },
                        handleFileChange(e, color) {
                            if (!this.enabled) return
                            const file = e.target.files[0] ?? null
                            this.variants[color].imageFile = file
                        }
                    }" x-init="init()">

                        <label class="block text-sm font-medium text-gray-700">Variant Colors</label>

                        <div class="w-86 relative text-sm">

                            <!-- ROW: Dropdown button LEFT + Switch RIGHT -->
                            <div class="flex items-start justify-between">

                                <!-- ▼▼▼ LEFT: your original dropdown button ▼▼▼ -->
                                <button type="button" @click="enabled && (open = !open)" :disabled="!enabled"
                                    class="w-full border rounded px-3 py-2 bg-white flex justify-between items-center"
                                    :class="!enabled ? 'bg-gray-200 cursor-not-allowed opacity-60' : ''">
                                    <span x-text="selectedSummary()"></span>
                                    <span>▾</span>
                                </button>
                                <!--  END LEFT PART -->
                                <!--  your switch  -->
                                <label
                                    class="relative inline-flex cursor-pointer items-center ml-3 text-gray-900 mt-1">
                                    <input type="checkbox" class="peer sr-only" x-model="enabled" />
                                    <div
                                        class="peer h-7 w-12 rounded-full bg-slate-300 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500">
                                    </div>
                                    <span
                                        class="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"></span>
                                </label>
                                <!--  END RIGHT PART  -->

                            </div>


                            <!-- DROPDOWN MENU -->
                            <div x-show="open" @click.away="open = false"
                                class="absolute w-full mt-1 bg-white border rounded shadow max-h-56 overflow-y-auto z-20">

                                <template x-for="c in colors" :key="c.name">
                                    <label class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100">
                                        <span class="w-4 h-4 rounded border" :style="`background:${c.code}`"></span>
                                        <input type="checkbox" :value="c.name" x-model="selected"
                                            :disabled="!enabled" class="w-4 h-4" />
                                        <span x-text="c.name"></span>
                                    </label>
                                </template>

                            </div>

                        </div>


                        <!-- Variant Table -->
                        <div x-show="selected.length > 0" :class="!enabled ? 'opacity-50 pointer-events-none' : ''"
                            class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 mt-3">

                            <div class="grid grid-cols-12 gap-3 text-xs font-semibold text-gray-600 border-b pb-2">
                                <div class="col-span-2">Variation Color</div>
                                <div class="col-span-2">SKU</div>
                                <div class="col-span-2">Quantity</div>
                                <div class="col-span-2">Price</div>
                                <div class="col-span-2">Image</div>
                                <div class="col-span-1 text-right"></div>
                            </div>

                            <template x-for="(color, idx) in selected" :key="color">
                                <div class="grid grid-cols-12 gap-3 items-center py-2 border-b">

                                    <div class="col-span-2 flex items-center gap-2">
                                        <template x-for="c in colors" :key="c.name">
                                            <span x-show="c.name === color" class="flex items-center gap-2">
                                                <span class="w-4 h-4 rounded border"
                                                    :style="`background:${c.code}`"></span>
                                                <span class="text-sm" x-text="c.name"></span>
                                            </span>
                                        </template>
                                    </div>

                                    <div class="col-span-2">
                                        <input type="text" x-model="variants[color].sku" :disabled="!enabled"
                                            class="w-full border rounded-lg px-3 py-2 text-sm" />
                                    </div>

                                    <div class="col-span-2 flex items-center gap-2 border rounded-lg px-3 py-2">
                                        <button type="button" @click="decrementQty(color)"
                                            :disabled="!enabled">−</button>
                                        <span x-text="variants[color].qty"></span>
                                        <button type="button" @click="incrementQty(color)"
                                            :disabled="!enabled">+</button>
                                    </div>

                                    <div class="col-span-2">
                                        <input type="number" x-model="variants[color].price" :disabled="!enabled"
                                            class="w-full border rounded-lg px-3 py-2 text-sm" />
                                    </div>

                                    <div class="col-span-2">
                                        <input type="file" @change="handleFileChange($event, color)"
                                            :disabled="!enabled"
                                            class="w-full border rounded-lg px-3 py-2 text-sm" />
                                    </div>

                                    <div class="col-span-1 flex justify-end">
                                        <button type="button" @click="removeColor(color)" :disabled="!enabled"
                                            class="p-2 rounded bg-red-50 text-red-600">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </template>

                        </div>

                    </div>
                    <!-- Attributes Panel Start-->
                    <div class="space-y-3" x-data="{
                        /* MAIN STATE */
                        open: false,
                        enabled: false,
                    
                        /* ATTRIBUTE LIST */
                        attributes: [
                            { name: 'Size', values: ['S', 'M', 'L', 'XL'] },
                            { name: 'Color', values: ['Red', 'Blue', 'Green'] },
                            { name: 'Material', values: ['Cotton', 'Polyester'] }
                        ],
                    
                        selected: [], // selected attribute names
                        attrValues: {}, // { Size: [...], Color: [...] }
                        selectedValues: {}, // selected per attribute
                        variants: {}, // generated variants
                        editor: null,
                        newValue: '',
                    
                        /* INIT */
                        init() {
                            this.attributes.forEach(a => {
                                this.attrValues[a.name] = [...a.values];
                                this.selectedValues[a.name] = [];
                            });
                    
                            /* WATCH attribute select */
                            this.$watch('selected', () => this.rebuildVariants());
                            this.$watch('selectedValues', () => this.rebuildVariants());
                        },
                    
                        /* SUMMARY TEXT */
                        summary() {
                            if (this.selected.length === 0) return 'Select attributes';
                            if (this.selected.length === 1) return this.selected[0];
                            return `${this.selected[0]} +${this.selected.length - 1}`;
                        },
                    
                        /* OPEN ATTRIBUTE EDITOR */
                        openEditor(name) {
                            if (!this.selected.includes(name)) this.selected.push(name);
                            this.editor = name;
                            this.newValue = '';
                        },
                    
                        /* ADD VALUE */
                        addValue(attr) {
                            const v = (this.newValue || '').trim();
                            if (!v) return;
                            if (!this.attrValues[attr].includes(v)) this.attrValues[attr].push(v);
                            if (!this.selectedValues[attr].includes(v)) this.selectedValues[attr].push(v);
                            this.newValue = '';
                            this.rebuildVariants();
                        },
                    
                        /* REMOVE VALUE */
                        removeValue(attr, val) {
                            this.attrValues[attr] = this.attrValues[attr].filter(x => x !== val);
                            this.selectedValues[attr] = this.selectedValues[attr].filter(x => x !== val);
                            this.rebuildVariants();
                        },
                    
                        /* TOGGLE SELECTED VALUE */
                        toggleSelection(attr, val) {
                            if (this.selectedValues[attr].includes(val)) {
                                this.selectedValues[attr] = this.selectedValues[attr].filter(x => x !== val);
                            } else {
                                this.selectedValues[attr].push(val);
                            }
                        },
                    
                        /* WHEN APPLY CLICKED */
                        applyEditor() {
                            this.editor = null;
                            this.rebuildVariants();
                        },
                    
                        /* REMOVE ATTRIBUTE */
                        removeAttribute(name) {
                            this.selected = this.selected.filter(x => x !== name);
                            this.attrValues[name] = [];
                            this.selectedValues[name] = [];
                            this.rebuildVariants();
                        },
                    
                        /* BUILD VARIANTS (cartesian) */
                        rebuildVariants() {
                            const lists = this.selected
                                .map(attr => ({
                                    attr,
                                    vals: this.selectedValues[attr].length ?
                                        this.selectedValues[attr] :
                                        this.attrValues[attr]
                                }))
                                .filter(x => x.vals.length);
                    
                            if (!lists.length) {
                                this.variants = {};
                                return;
                            }
                    
                            const combos = lists
                                .reduce((a, b) =>
                                    a.flatMap(d => b.vals.map(e => [...d, e])),
                                    [
                                        []
                                    ]
                                );
                    
                            const keys = combos.map(combo =>
                                lists.map((l, i) => `${l.attr}:${combo[i]}`).join('|')
                            );
                    
                            const newVariants = {};
                            keys.forEach(k => {
                                newVariants[k] = this.variants[k] ?? {
                                    sku: '',
                                    qty: 1,
                                    price: 0,
                                    imageFile: null
                                };
                            });
                    
                            this.variants = newVariants;
                        },
                    
                        incrementQty(key) { if (this.enabled) this.variants[key].qty++ },
                        decrementQty(key) { if (this.enabled) this.variants[key].qty = Math.max(0, this.variants[key].qty - 1) },
                    
                        handleFileChange(e, key) {
                            if (!this.enabled) return;
                            this.variants[key].imageFile = e.target.files[0] ?? null;
                        }
                    }" x-init="init()" x-cloak>


                        <!-- DROPDOWN + SWITCH -->
                        <div class="flex gap-3 items-start">
                            <div class="relative w-96">
                                <button @click="enabled && (open = !open)" :disabled="!enabled"
                                    class="w-full border rounded px-3 py-2 bg-white flex justify-between items-center"
                                    :class="!enabled ? 'bg-gray-200 opacity-60 cursor-not-allowed' : ''">
                                    <span x-text="summary()"></span>
                                    <span>▾</span>
                                </button>

                                <div x-show="open" @click.away="open=false"
                                    class="absolute w-full mt-1 bg-white border rounded shadow max-h-56 overflow-y-auto z-20">
                                    <template x-for="attr in attributes" :key="attr.name">
                                        <label
                                            class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                            <input type="checkbox" :value="attr.name" x-model="selected"
                                                :disabled="!enabled" class="w-4 h-4" />
                                            <span x-text="attr.name"></span>
                                            <button @click.stop="openEditor(attr.name)"
                                                class="ml-auto text-xs px-2 py-1 border rounded">edit</button>
                                        </label>
                                    </template>
                                </div>
                            </div>

                            <!-- SWITCH -->
                            <label class="relative inline-flex cursor-pointer items-center text-gray-900">
                                <input type="checkbox" class="peer sr-only" x-model="enabled">
                                <div
                                    class="peer h-7 w-12 rounded-full bg-slate-300 peer-checked:bg-indigo-600 transition">
                                </div>
                                <span
                                    class="absolute top-1 left-1 h-5 w-5 bg-white rounded-full peer-checked:translate-x-5 transition"></span>
                            </label>
                        </div>


                        <!-- ATTRIBUTE PREVIEW -->
                        <div x-show="selected.length"
                            class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm space-y-2 mt-3">
                            <template x-for="name in selected" :key="name">
                                <div class="flex items-center justify-between border rounded-lg px-3 py-2">
                                    <div>
                                        <div class="font-semibold text-sm" x-text="name"></div>
                                        <div class="text-xs text-gray-600">
                                            <template x-if="attrValues[name].length">
                                                <span
                                                    x-text="attrValues[name].slice(0,4).join(', ') + (attrValues[name].length>4?' +'+(attrValues[name].length-4):'')"></span>
                                            </template>
                                            <template x-if="!attrValues[name].length">
                                                <span class="text-gray-400 italic text-xs">No values</span>
                                            </template>
                                        </div>
                                    </div>

                                    <div class="flex gap-2">
                                        <button @click="openEditor(name)"
                                            class="px-2 py-1 text-xs border rounded">Manage</button>
                                        <button @click="removeAttribute(name)" :disabled="!enabled"
                                            class="px-2 py-1 text-xs border rounded text-red-600">Remove</button>
                                    </div>
                                </div>
                            </template>
                        </div>


                        <!-- VARIANT TABLE -->
                        <div x-show="Object.keys(variants).length"
                            class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3 mt-3"
                            :class="!enabled ? 'opacity-50 pointer-events-none' : ''">

                            <div class="grid grid-cols-12 gap-3 text-xs font-semibold text-gray-600 border-b pb-2">
                                <div class="col-span-5">Variant</div>
                                <div class="col-span-2">SKU</div>
                                <div class="col-span-1">Qty</div>
                                <div class="col-span-2">Price</div>
                                <div class="col-span-2">Image</div>
                            </div>

                            <template x-for="(v,key) in variants" :key="key">
                                <div class="grid grid-cols-12 gap-3 items-center py-2 border-b">

                                    <div class="col-span-5 text-sm" x-text="key"></div>

                                    <div class="col-span-2">
                                        <input x-model="variants[key].sku"
                                            class="border rounded px-3 py-2 text-sm w-full" />
                                    </div>

                                    <div
                                        class="col-span-1 flex items-center gap-2 justify-center border rounded px-2 py-1">
                                        <button @click="decrementQty(key)">−</button>
                                        <span x-text="variants[key].qty"></span>
                                        <button @click="incrementQty(key)">+</button>
                                    </div>

                                    <div class="col-span-2">
                                        <input type="number" x-model="variants[key].price"
                                            class="border rounded px-3 py-2 text-sm w-full" />
                                    </div>

                                    <div class="col-span-2">
                                        <input type="file" @change="handleFileChange($event,key)"
                                            class="border rounded px-3 py-2 text-sm w-full" />
                                    </div>

                                </div>
                            </template>

                        </div>


                        <!-- EDITOR MODAL -->
                        <div x-show="editor" class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
                            <div class="bg-white rounded-lg w-1/2 p-4 shadow-lg">

                                <div class="flex justify-between items-center mb-3">
                                    <h3 class="font-semibold" x-text="editor"></h3>
                                    <button @click="editor=null" class="text-red-600">✕</button>
                                </div>

                                <div>
                                    <div class="text-xs text-gray-600 mb-2">
                                        Add values for <span class="font-medium" x-text="editor"></span>
                                    </div>

                                    <div class="flex gap-2 mb-3">
                                        <input x-model="newValue" @keydown.enter.prevent="addValue(editor)"
                                            placeholder="Add value" class="border rounded px-3 py-2 text-sm w-full" />
                                        <button @click="addValue(editor)"
                                            class="px-3 py-2 border rounded">Add</button>
                                    </div>

                                    <div class="grid gap-2">
                                        <template x-for="val in attrValues[editor]" :key="val">
                                            <div class="flex items-center gap-2">
                                                <div class="border rounded px-3 py-2 text-sm flex-1" x-text="val">
                                                </div>
                                                <button @click="toggleSelection(editor,val)"
                                                    class="px-2 py-1 text-xs border rounded"
                                                    :class="selectedValues[editor].includes(val) ? 'bg-indigo-50' : ''">toggle</button>
                                                <button @click="removeValue(editor,val)"
                                                    class="px-2 py-1 text-xs border rounded text-red-600">delete</button>
                                            </div>
                                        </template>

                                        <div x-show="!attrValues[editor].length" class="italic text-xs text-gray-400">
                                            No values</div>
                                    </div>

                                    <div class="flex justify-end gap-2 mt-4">
                                        <button @click="applyEditor()"
                                            class="px-3 py-2 border bg-indigo-600 text-white rounded">Apply</button>
                                        <button @click="editor=null" class="px-3 py-2 border rounded">
                                            Close
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </div>
        <div x-data="{
            openImages: true,
            openCustom: true,
            cf: { warranties: false, manufacturer: false, expiry: false }
        }" class="space-y-6">
            <!-- ---------------- IMAGES PANEL ---------------- -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
                <!-- Header -->
                <button @click="openImages = !openImages"
                    class="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-50">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                        </svg>
                        <span class="font-semibold text-gray-800 text-lg">Images</span>
                    </div>
                    <svg class="w-5 h-5 text-gray-600 transition-transform duration-300"
                        :class="openImages ? 'rotate-180' : 'rotate-0'" fill="none" stroke="currentColor"
                        stroke-width="2" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                <!-- Body -->
                <div x-show="openImages" x-collapse.duration.300ms class="p-4">

                    <div class="flex flex-wrap items-center gap-4">

                        <!-- Add images Box -->
                        <label
                            class="w-32 h-32 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                            <input type="file" class="hidden">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            <span class="text-sm text-gray-500 mt-1">Add Images</span>
                        </label>

                        <!-- Static images -->
                        <div class="w-32 h-32 relative">
                            <img src="https://via.placeholder.com/150/ff4444/FFFFFF?text=Img1"
                                class="w-full h-full object-cover rounded-lg border" />
                            <button
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
                        </div>

                        <div class="w-32 h-32 relative">
                            <img src="https://via.placeholder.com/150/ff0000/FFFFFF?text=Img2"
                                class="w-full h-full object-cover rounded-lg border" />
                            <button
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
                        </div>

                    </div>

                </div>
            </div>



            <!-- ---------------- CUSTOM FIELDS PANEL ---------------- -->
            <div class="bg-white rounded-lg border border-gray-200 shadow-sm">

                <!-- Header -->
                <button @click="openCustom = !openCustom"
                    class="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-50">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span class="font-semibold text-gray-800 text-lg">Custom Fields</span>
                    </div>
                    <svg class="w-5 h-5 text-gray-600 transition-transform duration-300"
                        :class="openCustom ? 'rotate-180' : 'rotate-0'" fill="none" stroke="currentColor"
                        stroke-width="2" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                <!-- Body -->
                <div x-show="openCustom" x-collapse.duration.300ms class="p-4 space-y-4">

                    <!-- Checkbox toggles -->
                    <div class="flex items-center gap-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <label class="flex items-center gap-2 text-sm">
                            <input type="checkbox" x-model="cf.warranties" class="h-4 w-4 text-orange-500">
                            Warranties
                        </label>
                        <label class="flex items-center gap-2 text-sm">
                            <input type="checkbox" x-model="cf.manufacturer" class="h-4 w-4 text-orange-500">
                            Manufacturer
                        </label>
                        <label class="flex items-center gap-2 text-sm">
                            <input type="checkbox" x-model="cf.expiry" class="h-4 w-4 text-orange-500"> Expiry
                        </label>
                    </div>

                    <!-- Warranty -->
                    <div x-show="cf.warranties" x-collapse.duration.200ms>
                        <label class="block mb-1 text-sm font-medium">Warranty *</label>
                        <select
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:ring-orange-500">
                            <option value="">Select</option>
                            <option value="no-warranty">No Warranty</option>
                            <option value="6-months">6 Months</option>
                            <option value="1-year" selected>1 Year</option>
                            <option value="2-years">2 Years</option>
                        </select>
                    </div>

                    <!-- Manufacturer -->
                    <div x-show="cf.manufacturer" x-collapse.duration.200ms>
                        <label class="block mb-1 text-sm font-medium">Manufacturer *</label>
                        <input type="text" placeholder="Apple Inc."
                            class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:ring-orange-500">
                    </div>

                    <!-- Dates (Manufactured + Expiry) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div x-show="cf.manufacturer" x-collapse.duration.200ms>
                            <label class="block mb-1 text-sm font-medium">Manufactured Date *</label>
                            <input type="date"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300" />
                        </div>

                        <div x-show="cf.expiry" x-collapse.duration.200ms>
                            <label class="block mb-1 text-sm font-medium">Expiry On *</label>
                            <input type="date"
                                class="w-full border rounded-lg px-3 py-2 text-sm border-gray-300" />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>
</main>
