import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../core/services/payment.service';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { ToastrService } from 'ngx-toastr';
import { StripeCardElementOptions } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  stripeForm: FormGroup;
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;
  errorMessage: string | undefined = '';
  bookingId: string = '';

  // Stripe card styling options for customization
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  constructor(
    private _StripeService: StripeService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private fb: FormBuilder,
    private _PaymentService: PaymentService
  ) {
    this.stripeForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Retrieve booking ID from the URL parameters
    this.bookingId = this._ActivatedRoute.snapshot.params['id'];
  }

  // Method to create a Stripe token and process payment
  createToken() {
    this.isProcessing = true;
    this._StripeService.createToken(this.card.element, { name: 'Test User' }).subscribe((result) => {
      this.isProcessing = false;
      if (result.token) {
        this.paymentSuccess = true;
        this.errorMessage = '';

        // Call backend service to process the payment
        this._PaymentService.processPayment(this.bookingId, result.token.id).subscribe({
          next: (res) => {
            if (res.success) {
              this._ToastrService.success(res.message)
              this._Router.navigate(['/landing-page'])
            }
          }, error: (err) => {
            console.log(err);
            this._ToastrService.error(err.error.message)
          }
        })
      } else if (result.error) {
        this.errorMessage = result.error.message;
        this.paymentSuccess = false;
      }
    });
  }
}
