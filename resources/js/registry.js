async function getGameRegistryKeys() {
  const command = await Neutralino.os.execCommand(`reg query "HKEY_CURRENT_USER\\Software\\miHoYo\\Genshin Impact"`)
  const desCommand = await Neutralino.os.execCommand(`powershell "get-netadapter | Select 'MacAddress'"`)
  const macKeys = desCommand.stdOut.split('\n').map(l => l.replace(/-|\n|\r/g, '')).filter(l => l.length === 12)
  const output = command.stdOut.split('\n').filter(l => l.includes('MIHOYOSDK_ADL_PROD'))[0]
  const keys = output.split(' ').filter(l => l.length > 0)
  const regObj = {
    key: keys[0],
    type: keys[1],
    value: keys[2],
  }

  // Remove last two zeros from hex data
  const hexData = regObj.value.substring(0, regObj.value.length - 2)

  // Convert hex to ascii
  let hexConvertedToAscii = hexToAscii(hexData)

  console.log(hexConvertedToAscii)

  // Decrypt ascii data as base64
  let base64Decrypt = window.Base64.decode(hexConvertedToAscii)

  console.log(base64Decrypt)
  
  for (const macKey of macKeys) {
    // Get first 8 letters of the key
    const key = macKey.substring(0, 8)

    console.log(key)

    // Decrypt the data with the key
    const decrypted = decryptDes(base64Decrypt, key)

    // Decrypt the decrypted data from b64
    const b64Decrypt = atob(decrypted)

    console.log(decrypted)
    console.log(b64Decrypt)
  }
  
  // let c = ''
  // let out = ''

  // for (const char of regObj.value) {
  //   if (c.length == 2) {
  //     out += String.fromCharCode(parseInt(c, 16))
  //     c = ''
  //   } else {
  //     c += char
  //   }
  // }

  let testStr = ''

  for (var i = 0; i < hexData.length; i += 2) {
    testStr += hexData.substr(i, 2) + ' '
  }

  console.log(testStr)

  console.log(macKeys)
  console.log('Original: ', regObj.value)
  console.log('Hex decrypt: ', out)
  console.log('Base64 Decrypt: ', window.atob(out))
}

function decryptDes(message, key) {
  let keyWords = CryptoJS.enc.Utf8.parse(key);
  let ivWords = CryptoJS.lib.WordArray.create([0, 0]);

  let decrypted = CryptoJS.DES.decrypt({ciphertext: message}, keyWords, { iv: ivWords });

  return decrypted.toString(/* CryptoJS.enc.Utf8 */);
}

function hexToAscii(hex) {
  let str = '';
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}