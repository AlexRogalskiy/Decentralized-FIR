pragma solidity ^0.4.18;

contract FIRIPFS {

  mapping (uint => string) public idToFirHash;
  uint totalFirHash;

  function totalFirsCount() view public returns (uint) {
    return totalFirHash;
  }

  function createFir(string firHash) public returns (uint) {
    uint firId = totalFirHash++;
    idToFirHash[firId] = firHash;
    return firId;
  } 

  function showFir(uint firId) view public returns (string) {
    string storage firHash = idToFirHash[firId];
    return (firHash);
  } 
}