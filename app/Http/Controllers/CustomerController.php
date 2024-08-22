<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $sortBy = $request->get('sortBy');
        $sortDesc = $request->get('sortOrder');

        $customers = Customer::orderBy($sortBy, $sortDesc)->paginate(30);

        return response()->json($customers);
    }
}
