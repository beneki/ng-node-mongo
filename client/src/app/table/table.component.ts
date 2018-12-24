import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  private tableConfg = {
    selectedRow: null
  }

  headers = [
    "#",
    "compCodeHRIS",
    "compName",
    "compAbbrName",
    "compRegNo",
    "compLogo",
    "compActivateDate",
  ];

  tbConfig = {
    total: -1,
    page: -1,
    limit: 10,
    pages: 1,
  }

  limits = [5, 10, 15, 20, 25, 40, 50]
  rows = []
  inMemoryRow = {}
  confirm = {
    isInsert: true,
    isConfirmed: false,
    msg: ""
  }
  // pager object
  pager: any = {};

  constructor(private eventsService: EventService,
    private router: Router, private route: ActivatedRoute, private pagerService: PagerService) { }

  setPage(page) {
    this.pager = this.pagerService.getPager(this.tbConfig.total, page, this.tbConfig.limit);
    this.router.navigate([`/table/${page}`])
  }

  getCompanies(page, limit = 10) {
    const tbcnfg = this.tbConfig;
    if(tbcnfg.page !== page || tbcnfg.limit !== limit) {
      tbcnfg.page = page ? page : 1
      tbcnfg.limit = limit

      this.eventsService.getCompanies(tbcnfg)
      .subscribe(
        (res: any) => {
          console.log(res.docs);
          this.rows = res.docs
          this.tbConfig.pages = res.pages
          this.tbConfig.total = res.total
          this.setPage(page);
        },
        (err) => {
          if(err instanceof HttpErrorResponse){
            if(err.status === 401) {
              this.router.navigate(['/login'])
            }
          }
        },
      )
    }

    return false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCompanies(Number(params['id']))
    });
  }

  preInsert() {
    this.confirm.isInsert = true;
    this.inMemoryRow = {};
  }

  insertData() {
    this.eventsService.updateCompany(this.inMemoryRow)
    .subscribe(
      res => {
        this.confirm.isConfirmed = true;
        this.confirm.msg = "Data inserted successfully";
        this.router.navigate([`/table/${this.tbConfig.page}`])
      },
      err => {
        this.confirm.isConfirmed = false;
        this.confirm.msg = "An error occured in deleting";
        if(err instanceof HttpErrorResponse){
          if(err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      },
    )
  }

  preUpdateData(company) {
    this.confirm.isInsert = false;
    this.inMemoryRow = company;
  }

  updateData() {
    this.eventsService.updateCompany(this.inMemoryRow)
    .subscribe(
      res => {
        this.confirm.isConfirmed = true;
        this.confirm.msg = "Data updated successfully";
        this.router.navigate([`/table/${this.tbConfig.page}`])
      },
      err => {
        this.confirm.isConfirmed = false;
        this.confirm.msg = "An error occured in deleting";
        if(err instanceof HttpErrorResponse){
          if(err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      },
    )
  }

  deleteData(company) {
    this.eventsService.deleteCompany(company)
      .subscribe(
        res => {
          this.confirm.isConfirmed = true;
          this.confirm.msg = "data deleted successfully";
        },
        err => {
          this.confirm.isConfirmed = false;
          this.confirm.msg = "An error occured in deleting";
          if(err instanceof HttpErrorResponse){
            if(err.status === 401) {
              this.router.navigate(['/login'])
            }
          }
        },
      )
  }



  changePage(event, isNext: boolean) {
    event.stopPropagation();
    const current = this.tbConfig.page
    let now = current
    if(isNext) {
      now = current === this.tbConfig.pages ? current : current + 1;
    } else {
      now = current === 1 ? current : current - 1;
    }

    if(now !== current) {
      this.router.navigate([`/table/${now}`])
    }
    return false;
  }

  selectRow(compCode: string) {
    this.tableConfg.selectedRow = compCode;
  }

}
