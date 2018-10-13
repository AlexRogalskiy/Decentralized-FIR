import {Injectable} from '@angular/core';
import * as contract from 'truffle-contract';

declare let window: any;
declare let require: any;
const Web3 = require('web3');

const fir_artifacts = require('../../../build/contracts/FIR.json');

@Injectable()
export class Web3Service {
  // public web3: any;
  public web3Provider: any;
  public FIRContract: any;
  public address: string;
  public web3: any;

  constructor() {
    // window.addEventListener('load', (event) => {
    this.bootstrapWeb3();
    this.FIRContract = this.artifactsToContract(fir_artifacts);
    if(this.FIRContract){
      console.log("Contract created in service !");
    }
  }

  public bootstrapWeb3() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    window.web3 = new Web3(this.web3Provider);
    this.web3 = window.web3;
  }

  public artifactsToContract(artifacts) {
    // if (!this.web3Provider) {
    //   const delay = new Promise(resolve => setTimeout(resolve, 500));
    //   await delay;
    //   return await this.artifactsToContract(artifacts);
    // }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3Provider);
    return contractAbstraction;
  }
}
