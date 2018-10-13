pragma solidity ^0.4.18;

contract FIR {

  // string Fir;

  mapping (uint => string) public idToFir;
  uint totalFirs;

  function totalFirsCount() view public returns (uint) {
    return totalFirs;
  }

  function createFir(string fir_data) public returns (uint) {

    uint fir_id = totalFirs++;
    
    idToFir[fir_id] = fir_data;

    return fir_id;
  } 

  function showFir(uint fir_id) view public returns (string) {
    
    string storage t_fir = idToFir[fir_id];
    
    return (t_fir);
  } 
}