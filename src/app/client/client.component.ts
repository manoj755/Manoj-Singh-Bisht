import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {SwtCommonGridComponent} from './swt-common-grid.component';
// import { Logger } from './swt-logger.service';
import { HttpClient } from '@angular/common/http';
import { GridOption } from 'angular-slickgrid';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  private logger: Logger = null;

    @Input('pageCount') pageCount = 1;
    @Input('pageNumber') pageNumber = 1;

    totalItems = 0;
    processing = false;

    // Reference to the real pagination component
    realPagination =  true;
    _gridPaginationOptions: GridOption;
    commonGrid: SwtCommonGridComponent;

    @Input()
    set gridPaginationOptions(gridPaginationOptions: GridOption) {
      this._gridPaginationOptions = gridPaginationOptions;

      // The backendServiceApi is itself the SwtCommonGridComponent (This is a hack)
      this.commonGrid = <SwtCommonGridComponent>this.gridPaginationOptions.backendServiceApi.service;
    }
    get gridPaginationOptions(): GridOption {
      return this._gridPaginationOptions;
    }



    constructor(private httpClient: HttpClient) {
        this.logger = new Logger('grid-pagination', httpClient);
        this.logger.info('method [constructor] - START/END');
    }


    ngOnInit() {
        this.logger.info('init: ');
    }



    changeToFirstPage(event: any) {
      this.logger.info('method [changeToFirstPage] - START/END');
      this.pageNumber = 1;
      this.onPageChanged(event, this.pageNumber);
    }

    changeToLastPage(event: any) {
      this.logger.info('method [changeToLastPage] - START/END');
      this.pageNumber = this.pageCount;
      this.onPageChanged(event, this.pageNumber);
    }

    changeToNextPage(event: any) {
      this.logger.info('method [changeToNextPage] - START/END');
      if (this.pageNumber < this.pageCount) {
        this.pageNumber++;
        this.onPageChanged(event, this.pageNumber);
      }
    }

    changeToPreviousPage(event: any) {
      this.logger.info('method [changeToNextPage] - START/END');
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.onPageChanged(event, this.pageNumber);
      }
    }


    changeToCurrentPage(event: any) {
        this.logger.info('method [changeToCurrentPage] - START/END');
        this.pageNumber = event.currentTarget.value;
        if (this.pageNumber < 1) {
             this.pageNumber = 1;
        } else if (this.pageNumber > this.pageCount) {
             this.pageNumber = this.pageCount;
        }

        this.onPageChanged(event, this.pageNumber);
    }

    onPageChanged(event?: Event, pageNumber?: number) {
        this.logger.info('method [onPageChanged] - START/END', this.commonGrid);
        this.commonGrid.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: -1 });
      }

}
