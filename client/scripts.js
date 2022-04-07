// this is our abi that was generated when we compiled our contract on deployment
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function handleLinkWallet() {
  console.log("Attempting to link wallet");

  // lets get the provider that metamask has built in, using ethers
  provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(provider);

  // now we use JSON-RPC to call eth_requestAccounts to get our wallets details
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then(async () => {
      console.log("Wallet linked successfully");

      // get the signer from the provider
      const signer = await provider.getSigner();

      // get the wallet details from the signer
      const walletAddress = await signer.getAddress();

      //display the wallet details on the page
      document.querySelector(".wallet-address").innerHTML =
        "Connected wallet: </br></br>" + walletAddress;

      // show our functions and hide the connect button
      document.querySelector(".greeter-functions").classList.add("show");
      document.querySelector(".connect-wallet").classList.add("hide");
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Please connect to MetaMask.");
      } else {
        console.error(error);
      }
    });
}

async function getGreetingFromGreeter() {
  // get the signer from the provider
  const signer = await provider.getSigner();

  // get instance of the contract (which has all the magic methods and info we need)
  const greeterInstance = new ethers.Contract(
    "0xd9c18757Be428fDa4Eb0141413b0Bb72EBe86123",
    abi,
    signer
  );
  console.log(greeterInstance);

  // run our greet function on the contract (its that simple)
  const currentGreeting = await greeterInstance.greet();

  // put our greeting on the page
  document.querySelector(".greeting").innerHTML =
    "Current Greeting: </br></br>" + currentGreeting;
}

async function setGreetingOnGreeter() {
  // get the signer from the provider
  const signer = await provider.getSigner();
  // get instance of the contract (which has all the magic methods and info we need)
  const greeterInstance = new ethers.Contract(
    "0xd9c18757Be428fDa4Eb0141413b0Bb72EBe86123",
    abi,
    signer
  );

  // get our new greeting from the input
  const newGreeting = document.querySelector(".new-greeting").value;
  document.querySelector(".new-greeting").value = "";
  //remove the current greeting if its there
  document.querySelector(".greeting").innerHTML = "";

  // run our setGreeting function on the contract (its that simple)
  await greeterInstance.setGreeting(newGreeting);

  // set the new greeting on the front end (cheeky cheeky)
}
