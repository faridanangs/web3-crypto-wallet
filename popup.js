document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("accountList").addEventListener("click", changeAccount)
   
    document.getElementById("userAddress").addEventListener("click", copyAddress)
   
    document.getElementById("transferFund").addEventListener("click", handler)

    document.getElementById("header_network").addEventListener("click", getOpenNetwork)
   
    document.getElementById("network_item").addEventListener("click", getSelectedNetwork)
    
    document.getElementById("add_network").addEventListener("click", setNetwork)
   
    document.getElementById("accountCreate").addEventListener("click", createUser)

    document.getElementById("openCreate").addEventListener("click", openCreate)
  
    document.getElementById("loginAccount").addEventListener("click", loginUser)
   
    document.getElementById("sign_up").addEventListener("click", signUp)

    document.getElementById("login_up").addEventListener("click", logIn)

    document.getElementById("logout").addEventListener("click", logout)

    document.getElementById("open_Transfer").addEventListener("click", openTransfer)

    document.getElementById("goBack").addEventListener("click", goBack)

    document.getElementById("open_Import").addEventListener("click", openImport)

    document.getElementById("open_assets").addEventListener("click", openAssets)

    document.getElementById("open_activity").addEventListener("click", openActivity)

    document.getElementById("goHomePage").addEventListener("click", goHomePage)
    
    document.getElementById("openAccountImport").addEventListener("click", openImportModel)

    document.getElementById("close_import_account").addEventListener("click", closeImportModel)

    document.getElementById("add_new_token").addEventListener("click", addToken)

    document.getElementById("add_New_Account").addEventListener("click", addAccount)


})

// State Variable
let providerUrl = 'https://polygon-amoy.g.alchemy.com/v2/DbekPS-UnOwBTkvTWdGUhr-PKKu8ovjp';

let provider;
let privateKey;
let address;

// Function
function handler() { 
    document.getElementById("transfer_center").style.display = "flex";

    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;

    const private_key = 'd2af200fa84bf95e9223a787ad334993c0527b65b712df6c82b45e01fc5ad9a2'
    const testAccount= '0x4BB6Fe85e332Fe6c54EE447fd3a68506A72e1f7e'

    // Provider
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    let wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount),
    }

    let a = document.getElementById("link");
    a.href = 'somelink url'

    wallet.sendTransaction(tx).then((txObj)=> {
        console.log("txhsh: ", txObj.hash);

        document.getElementById("transfer_center").style.display = "none";
        const a = document.getElementById("link");

        document.getElementById("link").style.display = "block";
    })
};

function checkBalance() { 
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

};

function getOpenNetwork() { };

function getSelectedNetwork() { };

function setNetwork() { };

function loginUser() { };

function createUser() { };

function openCreate() { };

function signUp() { };

function logIn() { };

function logout() { };

function openTransfer() { };

function goBack() { };

function openImport() { };

function importGoBack() { }

function openActivity() { };

function openAssets() { };

function goHomePage() { };

function openImportModel() { };

function closeImportModel() { };

function addToken() { };


function addAccount() { };

function myFunction() { };

function copyAddress() { };

function changeAccount() { };

