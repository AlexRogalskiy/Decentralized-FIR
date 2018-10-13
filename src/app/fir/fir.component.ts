import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
import { Buffer } from 'buffer';
import { Web3Service } from '../util/web3.service';
import { IpfsService } from '../util/ipfs.service';

declare let require: any

@Component({
  selector: 'app-fir',
  templateUrl: './fir.component.html',
  styleUrls: ['./fir.component.css'],
  providers: [ Web3Service, IpfsService ]
})

export class FirComponent implements OnInit { 
  status: string = ''
  FIRContract: any
  total_firs: string = ""
  address: string = ""

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

  constructor(private web3Service: Web3Service, private ipfsService: IpfsService) { 
    console.log('Web3Service constructor loaded !')
  }

  ngOnInit(): void {
    this.FIRContract = this.web3Service.FIRContract
    if(!this.FIRContract){
      console.log("Contract not loaded !")
    }
    else{
      console.log("Contract loaded !")
    }
    
    this.getAccountAddr()
    this.updateFirCount()
  }

  getAccountAddr() {
    this.web3Service.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts')
      if (err != null) {
        console.warn('There was an error fetching your accounts.')
        return;
      }
      console.log(accs[0])
      this.address = accs[0]
    });
  }

  createFir(fir_str: string) {
    this.FIRContract.deployed().then((contractInstance) => {
      contractInstance.createFir(fir_str, {gas: 200000, from: this.address} ).then(() => {
          console.log("Fir added !!!")
      });
    });
  }

  createFirIPFS(fir_buf: any) {
    this.FIRContract.deployed().then((contractInstance) => {
      this.ipfsService.ipfs.add(fir_buf, (err, hash) => {
        if (err) {
          return console.log(err)
        }
        var str_hash = hash[0]['hash']
        console.log("HASH: ", str_hash)

        contractInstance.createFir(str_hash, {gas: 200000, from: this.address} ).then(() => {
            console.log("Fir added !!!")
            
        });
      });
    });
  }

  updateFirCount() {
    this.FIRContract.deployed().then((contractInstance) => {
      contractInstance.totalFirsCount.call().then((v) => {
        this.total_firs = "Total " + v.toString() + " FIRs submitted"
        console.log(v.toString())
      });
    });
  }

  submitFir(){
    var fir_str = "";
    for (var i in this.fir) {
      fir_str += "++" + this.fir[i] 
    }
    fir_str = fir_str.slice(2, fir_str.length)
    console.log(fir_str)

    this.createFir(fir_str)
    setTimeout(() => { this.updateFirCount(); }, 20000)
  }

  submitFirIPFS(){
    var fir_str = ""
    for (var i in this.fir) {
      fir_str += "++" + this.fir[i]
    }
    fir_str = fir_str.slice(2, fir_str.length)
    console.log(fir_str)

    var fir_buf = Buffer.from(fir_str, 'utf-8')
    this.createFirIPFS(fir_buf)
    setTimeout(() => { this.updateFirCount() }, 20000)
  }

  resetForm(){
    this.fir.topic = ""
    this.fir.subject = ""
    this.fir.description = ""
    this.fir.preparor_name = ""
    this.fir.preparor_address = ""
    this.fir.preparor_country = ""
    this.fir.preparor_phone = ""
    this.fir.preparor_email = ""
    this.fir.filer_name = ""
    this.fir.filer_address = ""
    this.fir.filer_country = ""
    this.fir.filer_phone = ""
    this.fir.filer_email = ""
  }

  // setStatus(status) {
  //   this.matSnackBar.open(status, null, {duration: 3000});
  // }

}
