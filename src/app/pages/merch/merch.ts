import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [],
  templateUrl: './merch.html',
  styleUrls: ['./merch.css'], // note plural
})
export class MerchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('buyContainer', { static: true }) buyContainer!: ElementRef<HTMLDivElement>;
  private uiInstance?: any;

  // === Your real values from the snippet ===
  private readonly domain = 'jjwsh6-59.myshopify.com';
  private readonly storefrontAccessToken = '0121f088684066e99a12eba7920e253e';
  private readonly collectionId = '298188898374';
  private readonly nodeId = 'collection-component-1758760578590';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(async () => {
      await this.ensureSdk();
      this.initBuyButton();
    });
  }

  ngOnDestroy(): void {
    try {
      if (this.uiInstance?.destroyComponent) this.uiInstance.destroyComponent();
    } catch {}
  }

  private ensureSdk(): Promise<void> {
    const src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    const existing = this.document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing && (window.ShopifyBuy?.UI)) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const script = this.document.createElement('script');
      script.async = true;
      script.src = src;
      script.onload = () => resolve();
      (this.document.head || this.document.body).appendChild(script);
    });
  }

  private initBuyButton(): void {
    const ShopifyBuy = window.ShopifyBuy;
    if (!ShopifyBuy) return;

    const client = ShopifyBuy.buildClient({
      domain: this.domain,
      storefrontAccessToken: this.storefrontAccessToken,
    });

    ShopifyBuy.UI.onReady(client).then((ui: any) => {
      this.uiInstance = ui.createComponent('collection', {
        id: this.collectionId,
        node: this.document.getElementById(this.nodeId),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: this.options(), // pulled from your snippet below
      });
    });
  }

  // === EXACT options from your Shopify snippet, expressed as TS object ===
  private options() {
  return {
    product: {
      contents: { img: true, title: true, price: true, button: true, options: true },
      styles: { product: { maxWidth: '100%' } }
    },
    cart: { popup: true }
  };
}
  
  
}
