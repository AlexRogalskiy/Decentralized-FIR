import { Injectable } from '@angular/core';
// import IPFS from 'ipfs-api';
declare let require: any;
const IPFS = require('ipfs-api');

@Injectable()
export class IpfsService {
  public ipfs: any;
    //run with local daemon
    // const ipfsApi = require(‘ipfs-api’);
    // const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});
  constructor() { 
      this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
  }
}
