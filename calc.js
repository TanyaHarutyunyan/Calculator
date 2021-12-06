window.onload = function () {
    function putInOutputText(el) {
        if (document.getElementById("outputText").innerText === "") {
            document.getElementById("outputText").innerText = el;
        } else {
            if (document.getElementById("outputText").innerText.length < 13){
                let formatBack = getFormatBack(document.getElementById("outputText").innerText)
                let formated = formatNumber(formatBack + el);
                document.getElementById("outputText").innerText = formated
            }
        }
    }

    function equalButton(num){
        let keeperText = document.getElementById("keeperText")
        keeperText.innerText += num
    }

    function removeOutputText() {
        document.getElementById("outputText").innerText = "";
    }

    function removeKeeperText() {
        document.getElementById("keeperText").innerText = "";
    }

    function removeFromTheEnd(num){
        if (num[num.length - 2] === "," || num[num.length - 2] === "-"){
            result = num.substr(0, num.length - 2)
        }else {
            result = num.substr(0, num.length - 1)
        }
        document.getElementById("outputText").innerText = result
    }

    function getResult(el){
        let result = eval(el.join(""))
        console.log(result)
        document.getElementById("outputText").innerText = formatNumber(result)
        document.getElementById("keeperText").innerText = ""
    }

    function formatNumber(el){
        return Number(el).toLocaleString("en")
    }

    function getFormatBack(el){
        return Number(el.replace(/,/g, ""))
    }

    let numbers = document.getElementsByClassName("number");
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function () {
        let num = numbers[i].innerText;
            putInOutputText(num);
        });
    }

    let operators = document.getElementsByClassName("operator");
    let arrForEval = []
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", function () {
            if (this.id === "C") {
                removeOutputText();
                removeKeeperText();
            }else if (this.id === "CE"){
                let num = document.getElementById("outputText").innerText
                removeFromTheEnd(num)
            }else if (this.id === "="){
                let changed = getFormatBack(document.getElementById("outputText").innerText)
                console.log(changed)
                    arrForEval.push(Number(changed))
                    equalButton(changed)
                    removeKeeperText()
                    getResult(arrForEval)
                    arrForEval = []
            }else {
                let oper = operators[i].innerText;
                let outputText = document.getElementById("outputText")
                let keeperText = document.getElementById("keeperText")
                if (outputText.innerText === "" && keeperText.innerText !== ""){
                    let replaced = Stirng(keeperText.innerText).split("").pop().push(oper).join()
                    keeperText.innerText = Number(replaced)
                }else {
                    if (outputText.innerText !== "" && keeperText.innerText === "") {
                        let changed = getFormatBack(outputText.innerText)
                        keeperText.innerText = changed + oper;
                        arrForEval.push((Number(changed)), oper)
                        console.log(arrForEval)
                    }else if (keeperText.innerText !== "" && outputText.innerText !== ""){
                        let changed = getFormatBack(outputText.innerText)
                        keeperText.innerText += changed + oper;
                        arrForEval.push((Number(changed)), oper)
                        console.log(arrForEval)
                    }
                        removeOutputText()
                }
            }

        });
    }
}