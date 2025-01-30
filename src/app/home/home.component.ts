import { Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { IMovie } from '../interface/imovie';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  private readonly apiService = inject(ApiserviceService);

  movies:IMovie[] = []
  imagePath:string= "https://image.tmdb.org/t/p/w500";
  pageNumber :string = '1';

  @ViewChildren('element') elements !: QueryList<ElementRef>;
  
  ngOnInit(): void {
    this.getData()
  }

  changePage( pageNum:string){
    
    this.pageNumber = pageNum;
    this.setActivePage();
    this.apiService.setPageNumber(pageNum);
    this.getData();

    
  }

  nextPage(){
    // Convert the string to a number
    let number = parseInt(this.pageNumber);
    // Check if the number is already 5
    if (number === 5) {
      return; // Do nothing if the number is 5
    }

    // Increment the number and convert it back to a string
    number += 1;
    this.pageNumber = number.toString();
    this.changePage(this.pageNumber);
    this.setActivePage();
  }

  prevPage():void{
    // Convert the string to a number
    let number = parseInt(this.pageNumber, 10);

    // Check if the number is already 5
    if (number === 1) {
      return; // Do nothing if the number is 5
    }

    // Increment the number and convert it back to a string
    number -= 1;
    this.pageNumber = number.toString();
    this.changePage(this.pageNumber);
    this.setActivePage();
  }

  getData():void{
    this.apiService.getData().subscribe({
      next:(res)=>{
        this.movies = res.results
        console.log(res)
      }, 
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Get Data Completed!");
      }
    })
  }


  setActivePage(){
    this.elements.forEach((element)=>{
      if (element.nativeElement.classList.contains('page-active')) {
        console.log(element.nativeElement.textContent); // Log the text content
        element.nativeElement.classList.replace('page-active','page-unactive'); // Add a new class
      }
    })

    const activeElement = this.elements.find((element, index) => element.nativeElement.getAttribute('name') === this.pageNumber)
    activeElement? activeElement.nativeElement.classList.replace('page-unactive','page-active') : null;

  }
}
