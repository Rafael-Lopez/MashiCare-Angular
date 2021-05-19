import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Product} from '../../../models/Product';
import {User} from '../../../models/User';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() authenticatedUser: User | null;
  @Input() products: any;
  @Input() resetProducts: any;
  // Component Interaction: Child to Parent
  @Output() filteredProducts = new EventEmitter<any>();
  searchTerm: string | undefined;

  constructor() {
    this.authenticatedUser = null;
  }

  ngOnInit(): void {
  }

  doSearch = () => {
    if (this.products && this.searchTerm !== undefined && this.searchTerm.length > 0) {
      this.filteredProducts.emit( this.products.filter(
        (product: Product) => {
          return product.name.toLowerCase().includes(this.searchTerm?.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchTerm?.toLowerCase());
        })
      );
    } else {
      this.resetProducts();
    }
  }
}
