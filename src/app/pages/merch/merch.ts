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
    __sbClient?: any; // singleton client
    __sbUI?: any;     // singleton UI
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

  private uiCollectionInstance?: any; // per-page collection grid
  private cartInstance?: any;         // per-page inline cart

  // === Your real values from the snippet ===
  private readonly domain = 'jjwsh6-59.myshopify.com';
  private readonly storefrontAccessToken = '0121f088684066e99a12eba7920e253e';
  private readonly collectionId = '298188898374';
  private readonly nodeId = 'collection-component-1758760578590';

  constructor(@Inject(DOCUMENT) private document: Document, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(async () => {
      await this.ensureSdk();
      await this.initBuyButton();
    });
  }

  ngOnDestroy(): void {
    // destroy only things created for this page
    try { this.uiCollectionInstance?.destroyComponent?.(); } catch {}
    try {
      this.cartInstance?.destroyComponent?.();
      this.cartInstance = undefined;
    } catch {}
  }

  // --- load the Buy Button SDK if needed ---
  private ensureSdk(): Promise<void> {
    const src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    const existing = this.document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing && window.ShopifyBuy?.UI) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const script = this.document.createElement('script');
      script.async = true;
      script.src = src;
      script.onload = () => resolve();
      (this.document.head || this.document.body).appendChild(script);
    });
  }

  // --- create/reuse client+UI, then build page components ---
  private async initBuyButton(): Promise<void> {
    const ShopifyBuy = window.ShopifyBuy;
    if (!ShopifyBuy) return;

    // client singleton
    if (!window.__sbClient) {
      window.__sbClient = ShopifyBuy.buildClient({
        domain: this.domain,
        storefrontAccessToken: this.storefrontAccessToken,
      });
    }

    // UI singleton
    const ui = window.__sbUI ?? (await ShopifyBuy.UI.onReady(window.__sbClient));
    window.__sbUI = ui;

    // collection for THIS page (safe to recreate on each visit)
    const node = this.document.getElementById(this.nodeId);
    if (node) {
      this.uiCollectionInstance = ui.createComponent('collection', {
        id: Number(this.collectionId),
        node,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          ...this.options(),
          // ensure shared options keep popup off so no fallback popup is created
          cart: { ...(this.options().cart || {}), popup: false },
        },
      });
    }

  //   // per-page inline cart (destroyed in ngOnDestroy to avoid duplicates)
  //   const cartNode = this.document.getElementById('inline-cart-container');
  //   if (cartNode) {
  //     this.cartInstance = ui.createComponent('cart', {
  //       node: cartNode,
  //       options: {
  //         styles: {
  //           cart:   { 'background-color': '#000000' },
  //           footer: { 'background-color': '#ff0000ff' },
  //           button: { 'border-radius': '7px' },
  //         },
  //         text: { title: 'Your Cart', total: 'Subtotal', button: 'Checkout' },
  //       },
  //     });
  //   }
   }

  // --- your Buy Button options (unchanged except lineItem.title template uses <a>) ---
  private options() {
    return {
      product: {
        isButton: false,
        contents: { img: false, imgWithCarousel: true, title: true, price: true, button: true, options: true },
        option: {
          // force the label color via template (works even if styles miss)
          templates: {
            option:
              `<div class="{{data.classes.option.option}}">
                <label class="{{data.classes.option.label}}"
                        style="color:#C5B358;opacity:1;font-weight:bold;font-size:14px;text-transform:uppercase;">
                  {{data.name}}
                </label>
                {{data.select}}
              </div>`
          },
        },
        
        styles: {
          product: {
            'border': '3px solid #C5B358',
            'background': "url('assets/asfalt--dark.png') repeat center center",
            'background-size': 'cover',
            'paddingBottom': '15px',
            'padding-top' : '15px',
            'padding-right': '5px',
            'padding-left': '5px',
            'min-height': '710px',
          },
            optionLabel: {
              'color': '#C5B358',      // your gold tone
              'font-weight': 'bold',
              'font-size': '14px',
              'text-transform': 'uppercase',
              'opacity': '1'    
              },
          
          title: {
            'color': '#C5B358',
            'font-weight': 'bold',
            'font-size': '25px',
          },
          price: {
            'color': '#C5B358',
            'font-size': '18px',
          },
          // let perRow control grid; don't hard-set width here
          button: {
            borderRadius: '7px',
            paddingLeft: '24px',
            paddingRight: '24px',
            background: '#C5B358',
            marginTop: '10px',
            marginBottom: '20px',
            ':hover': {
              'transform': 'scale(1.2)',
              background: '#C5B358',
            },
          },
          buttonWrapper: { 'margin-bottom': '20px' },
        },
        text: { button: 'Add to cart', paddingBottom: '30px' },
        googleFonts: ['Lato'],
      },
      option: {

        styles: {
          // Label text — “Color”, “Size”
          label: {
            'color': '#C5B358',
            'font-weight': 'bold',
            'font-size': '14px',
            'text-transform': 'uppercase',
            'opacity': '1'
          },

          // Dropdown itself
          select: {
            'border': '2px solid #C5B358',
            'border-radius': '4px',
            'background-color': '#ffffffff',  // dark background to match your theme
            'color': '#000000ff',
            'padding': '4px 8px'
          },

          // The container div around each variant row
          option: {
            'margin-top': '6px',
            'margin-bottom': '6px'
          }
        }
      },
      
      // grid
      productSet: {
        perRow: 2,
        perPage: 12,
        styles: { products: { '@media (min-width: 80px)': { marginLeft: '2' } } },
      },

      modalProduct: {
        contents: { img: true, imgWithCarousel: true, buttonWithQuantity: true },
        styles: {
          product: { '@media (min-width: 601px)': { maxWidth: '80%', marginLeft: '0', marginBottom: '0' } },
          button: {
            fontFamily: 'Lato, sans-serif',
            fontWeight: 'bold',
            borderRadius: '7px',
            paddingLeft: '54px',
            paddingRight: '54px',
            background: '#C5B358',
            'align-items': 'stretch',

          },
        },
        googleFonts: ['Lato'],
        text: { button: 'Add to cart' },
      },

      cart: {
        popup: false,
        styles: {
          cart: {
            'background': "url('assets/asfalt--dark.png') repeat center center",
            'border': '3px solid #C5B358',
            
          },
          header: { 'color': '#C5B358', 'font-size': '15px' },
          title: { 'color': '#C5B358' },
          close: { 'color': '#C5B358', 'border-color': '#C5B358', ':hover': { 'transform': 'scale(1.3)','color': '#C5B358' }},
          empty: { 'color': '#C5B358' },
          footer: {
            'background': "url('assets/asfalt--dark.png') repeat center center",
            'border-top': '3px solid #C5B358',
          },
          subtotalText: { 'color': '#C5B358' },
          subtotal: { 'color': '#C5B358' },
          notice: { 'color': '#C5B358' },

          button: {
            'background-color': '#C5B358',   // gold background
            'color': '#000000',              // black text
            'border-radius': '7px',
            'font-weight': 'bold',
            ':hover': {
              'background-color': '#e0b84f', // lighter gold hover
              'transform': 'scale(1.05)',
      }
    },
        },
        text: { total: 'Subtotal', button: 'Checkout', 'color': '#C5B358' },
        googleFonts: ['Lato'],
      },

      toggle: {
        styles: {
          toggle: {
            fontFamily: 'Lato, sans-serif',
            fontWeight: 'bold',
            'background-color': '#C5B358',
            ':hover': { 'transform': 'scale(1.1)', background: '#C5B358' },
          },
        },
        googleFonts: ['Lato'],
      },

      lineItem: {
        templates: {
          // keep anchor so built-in spacing applies; force your color
          title: '<p class="{{data.classes.lineItem.title}}" style="color:#C5B358;display:block;margin-left:72px;">{{data.title}}</p>',
        },
        styles: {
          variantTitle: { 'color': '#C5B358' },
          price:        { 'color': '#C5B358' },
          fullPrice:    { 'color': '#C5B358' },
          discount:     { 'color': '#C5B358' },
          quantity:     { 'color': '#C5B358', 'border-color': '#C5B358' },
          quantityInput:{ 'color': '#C5B358', 'border-color': '#C5B358' },
          quantityIncrement:{ 'color': '#C5B358', 'border-color': '#C5B358' },
          quantityDecrement:{ 'color': '#C5B358', 'border-color': '#C5B358' },
        },
      },
    };
  }
}