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
    // Collection of products
    this.uiInstance = ui.createComponent('collection', {
      id: Number(this.collectionId),
      node: this.document.getElementById(this.nodeId)!,
      moneyFormat: '%24%7B%7Bamount%7D%7D',
      options: {
        ...this.options(),
        // make sure popup is off for this collection's shared cart
        cart: { ...(this.options().cart || {}), popup: false },
      },
    });

    // Inline cart component rendered where you want it on the page
    ui.createComponent('cart', {
      node: this.document.getElementById('inline-cart-container')!,
      options: {
        styles: {
          cart:   { 'background-color': '#000000' },
          footer: { 'background-color': '#ffffff' },
          button: { 'border-radius': '7px' }
        },
        text: { title: 'Your Cart', total: 'Subtotal', button: 'Checkout' }
      }
    });
  });
}

  // === EXACT options from your Shopify snippet, expressed as TS object ===
private options() {
  return {
    product: {
      isButton: false,
      contents: { img: true, title: true, price: true, button: true, options: true },
      styles: {
            product: {
      // card container styles
              
              
    },
    title: {
      'color': '#C5B358',       // 👈 product name text
      'font-weight': 'bold',
      'font-size': '25px'
    },
    price: {
      'color': '#C5B358',       // 👈 product price text
      'font-size': '18px'
    },
        // 🔑 Do NOT set width/maxWidth here—let perRow control the grid
        button: {
          borderRadius: '7px',
          paddingLeft: '24px',
          paddingRight: '24px',
          background: '#C5B358',
          

          ':hover': {
            'background-color': '#016c38',  // red on hover
            'color': '#ffffff'              // white text on hover
      }
          
        }
      },
      text: { button: 'Add to cart' },
      googleFonts: ['Lato']
    },

    // 🔑 This makes it a grid
    productSet: {
      perRow: 2,     // 3 cards per row
      perPage: 12,   // load up to 12 items
      // (optional) small tidy:
      styles: { products: { '@media (min-width: 101px)': { marginLeft: '2' } } }
    },

    modalProduct: {
      contents: { img: true, imgWithCarousel: true, buttonWithQuantity: true },
      styles: {
        product: {
          '@media (min-width: 601px)': { maxWidth: '80%', marginLeft: '0', marginBottom: '0' }
        },
        button: {
          fontFamily: 'Lato, sans-serif',
          fontWeight: 'bold',
          borderRadius: '7px',
          paddingLeft: '54px',
          paddingRight: '54px',
          background: '#C5B358'
        }
      },
      googleFonts: ['Lato'],
      text: { button: 'Add to cart' }
    },

    cart: {
      popup: false,
      styles: {
        button: { fontFamily: 'Lato, sans-serif', fontWeight: 'bold', borderRadius: '7px' },
        cart:   { 
                  'background-color': '#016c38', 
                  'border': '3px solid #C5B358'
                },
        
        footer: { 
                  'background-color': '#016c38', 
                  'border-top': '3px solid #C5B358'
                }
      },
      text: { total: 'Subtotal', button: 'Checkout' },
      googleFonts: ['Lato']
    },

    toggle: {
      styles: {
        toggle: { fontFamily: 'Lato, sans-serif', fontWeight: 'bold', backgroundColor: '#C5B358' }
      },
      googleFonts: ['Lato']
    },

    lineItem: {
      styles: {
        variantTitle: { color: '#000000ff' }, title: { color: '#000000ff' }, price: { color: '#000000ff' },
        fullPrice: { color: '#000000ff' }, discount: { color: '#000000ff' }, discountIcon: { fill: '#000000ff' },
        quantity: { color: '#000000ff' },
        quantityIncrement: { color: '#fa0000', borderColor: '#fa0000' },
        quantityDecrement: { color: '#fa0000', borderColor: '#fa0000' },
        quantityInput: { color: '#fa0000', borderColor: '#fa0000' }
      }
    }
  };
}
  
}
