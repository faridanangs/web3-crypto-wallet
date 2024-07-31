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
    const testAccount = '0x4BB6Fe85e332Fe6c54EE447fd3a68506A72e1f7e'

    // Provider
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    let wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount),
    }

    let a = document.getElementById("link");
    a.href = 'somelink url'

    wallet.sendTransaction(tx).then((txObj) => {
        console.log("txhsh: ", txObj.hash);

        document.getElementById("transfer_center").style.display = "none";
        const a = document.getElementById("link");

        document.getElementById("link").style.display = "block";
    })
};

function checkBalance(address) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    provider.getBalane(address).then((bal) => {
        const balanceInEth = ethers.utils.formatEther(bal);

        document.getElementById("accountBlance").innerHTML = `${balanceInEth} MATIC`
        document.getElementById("userAddress").innerHTML = `${address.slice(0, 15)}...`
    })

};

function getOpenNetwork() {
    document.getElementById("network").style.display = "block";
};

function getSelectedNetwork(e) {
    const element = document.getElementById("selected_network");
    element.innerHTML = e.target.innerHTML;

    if (e.target.innerHTML == "Ethereum Mainnet") {
        providerUrl = "https://eth-mainnet.g.alchemy.com/v2/DbekPS-UnOwBTkvTWdGUhr-PKKu8ovjp"
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML == "Polygon Mainnet") {
        providerUrl = "https://rpc.ankr.com/polygon"
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML == "Polygon Amoy") {
        providerUrl = 'https://polygon-amoy.g.alchemy.com/v2/DbekPS-UnOwBTkvTWdGUhr-PKKu8ovjp';
    } else if (e.target.innerHTML == "Goerli test network") {
        providerUrl = "https://rpc.ankr.com/eth_goerli"
        document.getElementById("network").style.display = "none";
    } else if (e.target.innerHTML == "Sepolia test network") {
        providerUrl = "https://rpc.ankr.com/eth_sepolia"
        document.getElementById("network").style.display = "none";
    }

    console.log(providerUrl, "provier url")
};

function setNetwork() {
    document.getElementById("network").style.display = "none ";
};

function loginUser() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
};

function createUser() {
    document.getElementById("createAccount").style.display = "block";
    document.getElementById("LoginUser").style.display = "none";
};


function openCreate() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
};

function signUp() {
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_email").value;
    const pass = document.getElementById("sign_up_password").value;
    const passConfirm = document.getElementById("sign_up_passwordConfirm").value;

    document.getElementById("field").style.display = "none";
    document.getElementById("center").style.display = "block";

    const wallet = ethers.Wallet.createRandom();

    if (wallet.address) {
        console.log(wallet, "wallet");

        // API CALL
        const url = "http://localhost:3000/api/v1/user/signup";

        const data = {
            name: name,
            email: email,
            password: pass,
            passwordConfirm: passConfirm,
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((result) => {
            document.getElementById("createdAddress").innerHTML = wallet.address;
            document.getElementById("createdPrivateKey").innerHTML = wallet.privateKey;
            document.getElementById("createdMnmonic").innerHTML = wallet.mnemonic.phrase;

            document.getElementById("center").style.display = "none";
            document.getElementById("accountData").style.display = "block";
            document.getElementById("sign_up").style.display = "none";

            const userWallet = {
                address: wallet.address,
                private_key: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase
            }

            const jsonObj = JSON.stringify(userWallet);
            localStorage.setItem("userWallet", jsonObj);

            document.getElementById("goHomePage").style.display = "block";
            window.location.reload();

        }).catch(e => {
            console.log("ERROR: ", e)
        })
    }
};

function logIn() {
    document.getElementById("login_form").style.display = "none";
    document.getElementById("center").style.display = "block";

    const email = document.getElementById("login_email").value;
    const pass = document.getElementById("login_password").value;

    // API CALL
    const url = "http://localhost:3000/api/v1/users/login"
    const data = {
        email: email,
        password: pass
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resp) => resp.json()).then((result) => {
        console.log(result, "result");

        const userWallet = {
            address: result.data.user.address,
            private_key: result.data.user.private_key,
            mnemonic: result.data.user.mnemonic
        }

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);

    }).catch((e) => {
        console.log("ERROR: ", e)
    })
}

function logout() {
    localStorage.removeItem("userWallet");
    window.location.reload();
};

function openTransfer() {
    document.getElementById("transfer_from").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function goBack() {
    document.getElementById("transfer_from").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImport() {
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function importGoBack() {
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
}

function openActivity() {
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
};

function openAssets() {
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
};

function goHomePage() {
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImportModel() {
    document.getElementById("import_account").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function closeImportModel() {
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function addToken() {
    const address = document.getElementById("token_address").value;
    const symbol = document.getElementById("token_symbol").value;
    const name = document.getElementById("token_name").value;

    // API CALL
    const url = "http://localhost:3000/api/v1/tokens/createtoken";
    const data = {
        address: address,
        symbol: symbol,
        name: name
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resp) => resp.json()).then((result) => {
        console.log(result, "result");
        window.location.reload();
    }).catch((e) => {
        console.log("ERROR: ", e)
    })
};


function addAccount() {
    const privateKey = document.getElementById("add_account_private_key").value;

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    let wallet = new ethers.Wallet(privateKey, provider);

    console.log(wallet, "wallet add acount");

    const url = "http://localhost:3000/api/v1/account/createaccount";
    const data = {
        private_key: privateKey,
        address: wallet.address
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resp) => resp.json()).then((result) => {
        console.log(result, "result");
    }).catch((e) => {
        console.log("ERROR: ", e)
    })

};

function myFunction() {
    const str = localStorage.getItem("userWallet");
    const parseObj = JSON.parse(str);

    if (parseObj.address) {
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";

        privateKey = parseObj.private_key;
        address = parseObj.address;

        checkBalance(parseObj.address);
    }

    const tokenRender = document.querySelector(".assets");
    const accountRender = document.querySelector(".accountList");

    const url = "http://localhost:3000/api/v1/tokens/alltoken";
    fetch(url).then((response) => response.json()).then((data) => {
        let elements = '';

        data.data.map((token) => elements += `
        <div class="assets_item">
        <img class="assets_item_img" src="./assets/theblockchaincoders.png" alt="null" />
        <span>${token.address.slice(0, 15)}... </span>
        <span>${token.symbol}</span>
        `);

        tokenRender.innerHTML = elements;
    }).catch((e) => {
        console.log("ERROR: " + e)
    })

    const url2 = "http://localhost:3000/api/v1/account/allaccount";
    fetch(url2).then((response) => response.json()).then((data) => {
        let accounts = '';

        data.data.map((account, i) => accounts += `
        <div class="lists"> 
        <p>${i + 1}</p>
        <p class="accountValue" data-address=${account.address} data-privateKey=${account.privateKey} >${account.address.slice(0, 25)}...</p>
        `)

        accountRender.innerHTML = accounts;

    }).catch((e) => {
        console.log("Error", e)
    })

    console.log(privateKey, "private key")

};

function copyAddress() {
    navigator.clipboard.writeText(address);
};

function changeAccount() {
    const data = document.querySelector(".accountValue");
    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privateKey");

    const userWallet = {
        address: address,
        private_key: privateKey,
        mnemonic: "Changed"
    }
    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);
    window.location.reload();
};


window.onload = myFunction;