import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchFir(event, data){
    console.log(event)
    console.log(data)
    let query = data
    if(query)
      this.router.navigate(['/search', {q: query}])
  }

}
