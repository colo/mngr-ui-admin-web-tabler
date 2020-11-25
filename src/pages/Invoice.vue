<template>
  <q-page>
    <!-- Page title -->
    <div class="page-header d-print-none">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">
            Invoice
          </h2>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ml-auto d-print-none">
          <button type="button" class="btn btn-primary" onclick="javascript:window.print();">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><rect x="7" y="13" width="10" height="8" rx="2" /></svg>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
    <div class="card card-lg">
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <p class="h3">Company</p>
            <address>
              Street Address<br>
              State, City<br>
              Region, Postal Code<br>
              ltd@example.com
            </address>
          </div>
          <div class="col-6 text-right">
            <p class="h3">Client</p>
            <address>
              Street Address<br>
              State, City<br>
              Region, Postal Code<br>
              ctr@example.com
            </address>
          </div>
          <div class="col-12 my-5">
            <h1>Invoice INV/001/15</h1>
          </div>
        </div>
        <table class="table table-transparent table-responsive">
          <thead>
            <tr>
              <th class="text-center" style="width: 1%"></th>
              <th>Product</th>
              <th class="text-center" style="width: 1%">Qnt</th>
              <th class="text-right" style="width: 1%">Unit</th>
              <th class="text-right" style="width: 1%">Amount</th>
            </tr>
          </thead>
          <tr>
            <td class="text-center">1</td>
            <td>
              <p class="strong mb-1">Logo Creation</p>
              <div class="text-muted">Logo and business cards design</div>
            </td>
            <td class="text-center">
              1
            </td>
            <td class="text-right">$1.800,00</td>
            <td class="text-right">$1.800,00</td>
          </tr>
          <tr>
            <td class="text-center">2</td>
            <td>
              <p class="strong mb-1">Online Store Design &amp; Development</p>
              <div class="text-muted">Design/Development for all popular modern browsers</div>
            </td>
            <td class="text-center">
              1
            </td>
            <td class="text-right">$20.000,00</td>
            <td class="text-right">$20.000,00</td>
          </tr>
          <tr>
            <td class="text-center">3</td>
            <td>
              <p class="strong mb-1">App Design</p>
              <div class="text-muted">Promotional mobile application</div>
            </td>
            <td class="text-center">
              1
            </td>
            <td class="text-right">$3.200,00</td>
            <td class="text-right">$3.200,00</td>
          </tr>
          <tr>
            <td colspan="4" class="strong text-right">Subtotal</td>
            <td class="text-right">$25.000,00</td>
          </tr>
          <tr>
            <td colspan="4" class="strong text-right">Vat Rate</td>
            <td class="text-right">20%</td>
          </tr>
          <tr>
            <td colspan="4" class="strong text-right">Vat Due</td>
            <td class="text-right">$5.000,00</td>
          </tr>
          <tr>
            <td colspan="4" class="font-weight-bold text-uppercase text-right">Total Due</td>
            <td class="font-weight-bold text-right">$30.000,00</td>
          </tr>
        </table>
        <p class="text-muted text-center mt-5">Thank you very much for doing business with us. We look forward to working with
          you again!</p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageInvoice'
}
</script>
