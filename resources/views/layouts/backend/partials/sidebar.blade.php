  <aside @mouseenter="sidebarHovered = true" @mouseleave="sidebarHovered = false"
      :class="[
          'bg-white text-gray-800 shadow-xl transition-all duration-300 fixed lg:static z-50 h-screen',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          (sidebarCollapsed && !sidebarHovered) ? 'sidebar-collapsed' : 'sidebar-expanded'
      ]">
      <div class="flex h-16 items-center justify-center border-b border-gray-200">
          <div class="flex items-center gap-3 px-3">
              <svg class="h-6 w-6 text-orange-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                  <rect width="7" height="5" x="3" y="16" rx="1"></rect>
              </svg>
              <h1 x-show="!sidebarCollapsed || sidebarHovered" x-transition
                  class="text-xl font-bold text-orange-500 whitespace-nowrap">
                  AdminPro
              </h1>
          </div>
      </div>

      <nav class="h-full overflow-y-auto p-4 no-scrollbar pb-20">
          <div x-show="!sidebarCollapsed || sidebarHovered" x-transition
              class="text-sm font-semibold text-gray-500 mb-2">
              Main
          </div>
          <ul class="space-y-1">
              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <path d="M3 12l9-9 9 9"></path>
                          <path d="M9 12v9h6v-9"></path>
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition class="whitespace-nowrap text-sm">
                          Dashboard
                      </span>
                  </a>
              </li>
              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <circle cx="12" cy="12" r="3" />
                          <path
                              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition class="whitespace-nowrap text-sm">
                          Super Admin
                      </span>
                  </a>
              </li>
          </ul>

          <div class="my-4 border-t border-gray-100"></div>

          <div x-show="!sidebarCollapsed || sidebarHovered" x-transition
              class="text-sm font-semibold text-gray-500 mb-2">
              Inventory
          </div>
          <ul class="space-y-1">
              <li>
                  <a wire:navigate href="{{ route('admin.products.index') }}"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <line x1="9" x2="9" y1="3" y2="21" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition class="whitespace-nowrap text-sm">
                          Products
                      </span>
                  </a>
              </li>
              <li>
                  <a wire:navigate href="{{ route('admin.products.create') }}"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <path d="M12 5v14M5 12h14" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition class="whitespace-nowrap text-sm">
                          Create Product
                      </span>
                  </a>
              </li>
              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" x2="9" y1="9" y2="15" />
                          <line x1="9" x2="15" y1="9" y2="15" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition class="whitespace-nowrap text-sm">
                          Expired Products
                      </span>
                  </a>
              </li>
              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition
                          class="whitespace-nowrap text-sm">
                          Low Stock
                      </span>
                  </a>
              </li>
              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <path d="M4 7h16M4 12h16M4 17h16" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition
                          class="whitespace-nowrap text-sm">
                          Categories
                      </span>
                  </a>
              </li>
              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <rect width="7" height="7" x="3" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="14" rx="1" />
                          <rect width="7" height="7" x="3" y="14" rx="1" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition
                          class="whitespace-nowrap text-sm">
                          Brands
                      </span>
                  </a>
              </li>
          </ul>

          <div class="my-4 border-t border-gray-100"></div>

          <div x-show="!sidebarCollapsed || sidebarHovered" x-transition
              class="text-sm font-semibold text-gray-500 mb-2">
              Sales
          </div>
          <ul class="space-y-1">
              <li x-data="{ open: false }">
                  <button @click="open = !open"
                      class="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <div class="flex items-center gap-3">
                          <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2">
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                          <span x-show="!sidebarCollapsed || sidebarHovered" x-transition
                              class="whitespace-nowrap text-sm">
                              Sales
                          </span>
                      </div>
                      <svg x-show="!sidebarCollapsed || sidebarHovered" :class="open ? 'rotate-180' : ''"
                          class="transition-all duration-300 w-4 h-4 text-gray-500 flex-shrink-0" fill="none"
                          stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6" />
                      </svg>
                  </button>

                  <ul x-show="open && (!sidebarCollapsed || sidebarHovered)" x-collapse
                      class="mt-1 ms-9 space-y-1 text-[13px] text-gray-600">
                      <li>
                          <a href="#"
                              class="block rounded-md px-2 py-1 transition hover:bg-orange-50 hover:text-orange-500">
                              <svg class="inline-block me-2 h-2 w-2" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" stroke-width="2">
                                  <circle cx="12" cy="12" r="10" />
                              </svg>
                              Online Orders
                          </a>
                      </li>
                      <li>
                          <a href="#"
                              class="block rounded-md px-2 py-1 transition hover:bg-orange-50 hover:text-orange-500">
                              <svg class="inline-block me-2 h-2 w-2" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" stroke-width="2">
                                  <circle cx="12" cy="12" r="10" />
                              </svg>
                              POS Orders
                          </a>
                      </li>
                  </ul>
              </li>

              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition
                          class="whitespace-nowrap text-sm">
                          Invoices
                      </span>
                  </a>
              </li>
          </ul>

          <div class="my-4 border-t border-gray-100"></div>

          <div x-show="!sidebarCollapsed || sidebarHovered" x-transition
              class="text-sm font-semibold text-gray-500 mb-2">
              Settings
          </div>
          <ul class="space-y-1">
              <li x-data="{ open: false }">
                  <button @click="open = !open"
                      class="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <div class="flex items-center gap-3">
                          <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="3" />
                              <path
                                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                          <span x-show="!sidebarCollapsed || sidebarHovered" x-transition
                              class="whitespace-nowrap text-sm">
                              General Settings
                          </span>
                      </div>
                      <svg x-show="!sidebarCollapsed || sidebarHovered" :class="open ? 'rotate-180' : ''"
                          class="transition-all duration-300 w-4 h-4 text-gray-500 flex-shrink-0" fill="none"
                          stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6" />
                      </svg>
                  </button>

                  <ul x-show="open && (!sidebarCollapsed || sidebarHovered)" x-collapse
                      class="mt-1 ms-9 space-y-1 text-[13px] text-gray-600">
                      <li>
                          <a href="#"
                              class="block rounded-md px-2 py-1 transition hover:bg-orange-50 hover:text-orange-500">
                              <svg class="inline-block me-2 h-2 w-2" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" stroke-width="2">
                                  <circle cx="12" cy="12" r="10" />
                              </svg>
                              Profile Settings
                          </a>
                      </li>
                      <li>
                          <a href="#"
                              class="block rounded-md px-2 py-1 transition hover:bg-orange-50 hover:text-orange-500">
                              <svg class="inline-block me-2 h-2 w-2" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" stroke-width="2">
                                  <circle cx="12" cy="12" r="10" />
                              </svg>
                              Security Settings
                          </a>
                      </li>
                  </ul>
              </li>

              <li>
                  <a href="#"
                      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:shadow-sm">
                      <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                      </svg>
                      <span x-show="!sidebarCollapsed || sidebarHovered" x-transition
                          class="whitespace-nowrap text-sm">
                          Logout
                      </span>
                  </a>
              </li>
          </ul>
      </nav>
  </aside>
