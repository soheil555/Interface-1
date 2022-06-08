async function swapCoin() {
    wallet_address = document.querySelector('#wallet_address').value
    console.log();
    await Moralis.enableWeb3()
    
    let options = {
      contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      functionName: "uniswapV2Call",
      abi: [
        {
          "anonymous": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
      
      ],
      params: {
        account: wallet_address,
      },
    };
    res = await Moralis.executeFunction(options)
    console.log(res._hex);
    hex = res._hex
    res = parseInt(hex, 16) / 1000000000000000000;
    console.log(res);
    $('.balance').show()
    $('.user_balance').text(res)
  }

  document.getElementById("swap").onclick = swapCoin;