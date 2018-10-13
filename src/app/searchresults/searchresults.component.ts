import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from '../util/web3.service';
import { IpfsService } from '../util/ipfs.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit, OnDestroy {
  private routeSub: any
  FIRContract: any
  query: any

  fir: { [id: string]: any; } = {
    topic: "",
    subject: "",
    description: "",
    preparor_name: "",
    preparor_address: "",
    preparor_country: "",
    preparor_phone: "",
    preparor_email: "",
    filer_name: "",
    filer_address: "",
    filer_country: "",
    filer_phone: "",
    filer_email: ""
  }

  constructor(private route: ActivatedRoute, private web3Service: Web3Service, private ipfsService: IpfsService) { }

  ngOnInit() {
    this.FIRContract = this.web3Service.FIRContract;
    if(!this.FIRContract){
      console.log("Contract not loaded !")
    }
    else{
      console.log("Contract loaded !")
    }

    this.routeSub = this.route.params.subscribe(params=>{
      this.query = parseInt(params['q'])
      console.log("searched: ", this.query)
      if(this.query==0)
        console.log("Invalid ID!")
      else
        this.showFirIPFS()
    })
  }

  showFir() {
    this.FIRContract.deployed().then((contractInstance) => {
      contractInstance.showFir.call(this.query).then((v) => {
        console.log(v)
        var fields = v.toString().split("++")
        // console.log(fields)
        var j=0
        for (var i in this.fir) {
          this.fir[i] = fields[j]
          j++
        }
        console.log(this.fir)
      });
    });
  }

  showFirIPFS(){
    this.FIRContract.deployed().then((contractInstance) => {
      contractInstance.totalFirsCount.call().then((v) => {
        console.log(parseInt(this.query), parseInt(v.toString()))
        if(parseInt(this.query + 1) > parseInt(v.toString()))
          return console.log("Invalid Id !")

          contractInstance.showFir.call(this.query + 1).then((v) => {
            console.log(v)
            this.ipfsService.ipfs.cat(v.toString(), (err, data) => {
              if (err) {
                console.log("ERROR !!!")
                return console.log(err)
              }
              
              console.log("DATA:", data.toString('utf8'))
    
              var fields = data.toString('utf8').split("++")
              console.log(fields)
    
              var j=0
              for (var i in this.fir) {
                this.fir[i] = fields[j]
                j++
              }
              // console.log(this.fir)
             });
          });
      });
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe()
  }

}
