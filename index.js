const Web3 = require('web3');
const color = require('colourize');
const fs = require('fs');

const web3 = new Web3('https://cloudflare-eth.com/');

async function main() {
  const alpha_claim_signature = web3.eth.abi.encodeFunctionSignature(
    'alphaClaimed(uint256)'
  );
  const beta_claim_signature = web3.eth.abi.encodeFunctionSignature(
    'betaClaimed(uint256)'
  );
  const gamma_claim_signature = web3.eth.abi.encodeFunctionSignature(
    'gammaClaimed(uint256)'
  );

  const ws = fs.createWriteStream('claims.csv');
  ws.write('token_id,bayc,mayc,bakc,\n');

  for (let i = 1; i < 9999; i++) {
    const tokenId = web3.eth.abi.encodeParameter('uint256', String(i));
    const alpha_input = alpha_claim_signature + tokenId.substr(2);
    const beta_input = beta_claim_signature + tokenId.substr(2);
    const gamma_input = gamma_claim_signature + tokenId.substr(2);

    const alphaClaimed = await web3.eth.call({
      to: '0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f', // contract address
      data: alpha_input,
    });
    const betaClaimed = await web3.eth.call({
      to: '0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f', // contract address
      data: beta_input,
    });
    const gammaClaimed = await web3.eth.call({
      to: '0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f', // contract address
      data: gamma_input,
    });

    // const results = await Promise.all([
    //   web3.eth.call({
    //     to: '0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f', // contract address
    //     data: alpha_input,
    //   }),
    //   web3.eth.call({
    //     to: '0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f', // contract address
    //     data: beta_input,
    //   }),
    //   web3.eth.call({
    //     to: '0x025c6da5bd0e6a5dd1350fda9e3b6a614b205a1f', // contract address
    //     data: gamma_input,
    //   }),
    // ]);

    let bayc = web3.utils.hexToNumber(alphaClaimed);
    let mayc = web3.utils.hexToNumber(betaClaimed);
    let bakc = web3.utils.hexToNumber(gammaClaimed);

    ws.write(
      `${i}, ${bayc}, ${mayc}, ${bakc}\n`);

    if (bayc === 1) {
      bayc = color.red("claimed");
    } else {
      bayc = color.green("available");
    }

    if (mayc === 1) {
      mayc = color.red("claimed");
    } else {
      mayc = color.green("available");
    }

    if (bakc === 1) {
      bakc = color.red("claimed");
    } else {
      bakc = color.green("available");
    }

    console.log(`NFT #${i}: BAYC: ` + bayc + "  MAYC: " + mayc + "  BAKC: " + bakc );

  }
}

main();
