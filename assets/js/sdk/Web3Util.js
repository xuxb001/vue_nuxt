import Web3 from "web3"

class Web3Util {
    constructor() {
    }

    string2bytes32(val) {
        let res = Web3.utils.stringToHex(val)
        res = res + Array(67 - res.length).join('0')
        return res
    }

    toWei(val) {
        return Web3.utils.toWei(val)
    }

    utf8ToHex(val) {
        return Web3.utils.utf8ToHex(val)
    }


    keccak256(val) {
        return Web3.utils.keccak256(val)
    }

    hexToBytes(val) {
        return Web3.utils.hexToBytes(val)
    }

    hexToAscii(val) {
        return Web3.utils.hexToAscii(val);
    }

    numberToHex(val) {
        return Web3.utils.numberToHex(val);
    }
    hexToNumber(val) {
        return Web3.utils.hexToNumber(val)
    }

    getAbiEventInputs(abi, name) {
        for (let item of abi) {
            if (item.type == 'event' && item.name == name) {
                return item.inputs
            }
        }
        return null
    }

    encodeEventName(inputs, name) {
        if (inputs == null) {
            return null
        }
        // console.log('inputs:', inputs)
        let params = []
        inputs.map(o => {
            params.push(o.type)
        })
        // console.log('params:', params)
        let funcName = name + '(' + params.join(',') + ')'
        // console.log('funcName:', funcName)
        let enFuncName = Web3.utils.sha3(funcName)
        // console.log('enFuncName:', enFuncName)
        return enFuncName
    }

    decodeEventLog(web3, inputs, data, topics) {
        data = data.substr(2)

        let topic = topics.slice()
        topic.splice(0, 1);
        let inputData = inputs.slice()
        // console.log('parseEventLog params:', inputs, data, topic)
        let result = web3.eth.abi.decodeLog(inputData, data, topic)
        // console.log('parseEventLog logs:', result)
        return result
    }

    parseEventLog(web3, abi, receipt, name) {
        // console.log('web3 parseEventLog:', receipt)
        let result = {
            hash: receipt.transactionHash,
            address: '',
            data: {}
        }
        for (let log of receipt.logs) {
            let inputs = this.getAbiEventInputs(abi, name)
            let topic = this.encodeEventName(inputs, name)
            if (topic == log.topics[0]) {
                result.data = this.decodeEventLog(web3, inputs, log.data, log.topics)
                result.address = log.address
                break
            }
        }
        return result
    }

}

export default Web3Util
