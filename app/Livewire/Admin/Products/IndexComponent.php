<?php

namespace App\Livewire\Admin\Products;

use Livewire\Component;

class IndexComponent extends Component
{
    public function render()
    {
        return view('livewire.admin.products.index-component')->layout('layouts.backend.app');
    }
}
