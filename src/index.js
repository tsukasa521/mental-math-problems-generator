
function run(operator, numCount, range, resultRange, plusRule, minusRule, divideRule, resultCount) {
    // 检查参数合法性
    numCount = checkNumCount(numCount);
    operator = checkOperator(operator, numCount);
    range = checkRange(range, numCount);
    resultRange = checkResultRange(resultRange);
    resultCount = checkResultCount(resultCount);
    plusRule = checkRule(plusRule, null);
    minusRule = checkRule(minusRule, null);
    divideRule = checkRule(divideRule, numCount);

    var count = 0;
    var loopCount = 0;
    var temp;
    A:
    while (count < resultCount) {
        loopCount++;
        if (loopCount > 5000 && count == 0) {
            console.log("生成失败，请检查参数范围");
            break A;
        }
        if (loopCount > 100000) {
            console.log("条件太过苛刻");
            break A;
        }

        // 生成运算数
        var nums = new Array();
        for (var i = 0; i < numCount; i++) {
            nums[i] = getRandom(range[i][0], range[i][1]);
        }

        temp = nums[0];

        // 生成运算符
        var tempOperator = operator;
        for (var i = 0; i < numCount - 1; i++) {
            if (tempOperator[i] == 4) {
                tempOperator[i] = getRandom(0, 3);
            }

            switch (tempOperator[i]) {
                case 0:
                    temp = runPlus(temp, nums[i + 1], plusRule);
                    break;
                case 1:
                    temp = runMinus(temp, nums[i + 1], minusRule);
                    break;
                case 2:
                    temp = runMultiply(temp, nums[i + 1], 0);
                    break;
                case 3:
                    temp = runDivide(temp, nums[i + 1], divideRule);
                    break;
                default:
                    break;
            }
            if (temp == null) {
                continue A;
            }
        }

        if (checkResult(temp, resultRange)) {
            count++;
            printResult(nums, tempOperator, numCount, temp);
        }
    }
}



function runPlus(a, b, rule) {
    var success = false;
    var temp = false;

    var a_0;
    var b_0;
    var temp_a = a;
    var temp_b = b;

    if (rule == 0) {
        success = true;
    } else {
        do {
            a_0 = temp_a % 10;
            temp_a = temp_a / 10;
            b_0 = temp_b % 10
            temp_b = temp_b / 10;
            if (a_0 + b_0 >= 10) {
                temp = true;
                break;
            }
        } while (temp_a > 0 && temp_b > 0);
        success = temp == (rule == 1);
    }

    if (success) {
        return a + b;
    } else {
        return null;
    }
}


function runMinus(a, b, rule) {
    if (a < b) {
        return null;
    }

    var success = false;
    var temp = false;
    var a_0;
    var b_0;
    var temp_a = a;
    var temp_b = b;

    if (rule == 0) {
        success = true;
    } else {
        do {
            a_0 = temp_a % 10;
            temp_a = temp_a / 10;
            b_0 = temp_b % 10;
            temp_b = temp_b / 10;
            if (a_0 < b_0) {
                temp = true;
                break;
            }
        } while (temp_a > 0 && temp_b > 0);
        success = temp == (rule == 1);
    }

    if (success) {
        return a - b;
    } else {
        return null;
    }
}

function runMultiply(a, b, rule) {
    return a * b;
}

function runDivide(a, b, rule) {
    if (a < b) {
        return null;
    }

    var success = false;
    var temp = false;
    if (rule == 0) {
        success = true;
    } else {
        temp = a % b != 0;
        success = temp == (rule == 1);
    }

    if (success) {
        return a / b;
    } else {
        return null;
    }
}

function checkResult(result, resultRange) {
    return (resultRange[0] == null || result >= resultRange[0])
        && (resultRange[1] == null || result <= resultRange[1]);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getOperator(index) {
    switch (index) {
        case 0:
            return " + ";
        case 1:
            return " - ";
        case 2:
            return " x ";
        case 3:
            return " / ";
        default:
            return null;
    }
}

function checkNumCount(numCount) {
    if (numCount == null || numCount > 3 || numCount < 2) {
        numCount = 2;
    }
    return numCount;
}

function checkOperator(operator, numCount) {
    if (operator == null) {
        operator = new Array(numCount - 1);
    } else if (operator.length < numCount - 1) {
        var temp = new Array(numCount - 1);
        for (var i = 0; i < operator.length; i++) {
            temp[i] = operator[i];
        }
        operator = temp;
    }
    for (var i = 0; i < numCount - 1; i++) {
        if (operator[i] == null || operator[i] > 4 || operator[i] < 0) {
            operator[i] = getRandom(0, 4);
        }
    }
    return operator;
}

/**
 * 参数检查-运算数范围
 *
 * @param range
 * @param numCount
 * @return
 */
function checkRange(range, numCount) {
    if (range == null) {
        range = new Array(numCount).fill(new Array(2));
    } else if (range.length < numCount) {
        var temp = new Array(numCount);
        for (var i = 0; i < range.length; i++) {
            if (range[i] == null) {
                temp[i] = new Array(2);
            } else if (range[i].length < 2) {
                temp[i] = new Array(2);
                temp[i][0] = range[i][0];
            } else {
                temp[i] = range[i];
            }
        }
        range = temp;
    }

    for (var i = 0; i < numCount; i++) {
        if (range[i][0] == null) {
            range[i][0] = 0;
        }
        if (range[i][1] == null) {
            range[i][1] = 9999;
        }
    }
    return range;
}

/**
 * 参数检查-结果范围
 * 主要处理长度<2的情况
 *
 * @param resultRange
 * @return
 */
function checkResultRange(resultRange) {
    if (resultRange != null && resultRange.length < 2) {
        var temp = new Array(2);
        temp[0] = resultRange[0];
        resultRange = temp;
    }
    return resultRange;
}

function checkResultCount(resultCount) {
    if (resultCount == null || resultCount >= 1000 || resultCount <= 0) {
        resultCount = 20;
    }
    return resultCount;
}

function checkRule(rule, numCount) {
    if (rule == null || rule > 2 || rule < 0) {
        rule = 0;
    }
    if (numCount != null && numCount == 3) {
        rule = 2;
    }
    return rule;
}

function printResult(nums, operator, numCount, result) {
    var exchange = false; // getRandom(0, 1) == 1;
    var bracket = operator[1] != null && operator[0] <= 1 && operator[1] >= 2;

    var print = "";
    if (bracket) {
        print = "(" + nums[0] + getOperator(operator[0]) + nums[1] + ")";
    } else {
        print = nums[0] + getOperator(operator[0]) + nums[1];
    }

    if (numCount == 3) {
        if (exchange) {
            print = nums[2] + getOperator(operator[1]) + print;
        } else {
            print = print + getOperator(operator[1]) + nums[2];
        }
    }

    print += " = " + result;

    console.log(print);
}


// 运算符 0-加法 1-减法 2-乘法 3-除法 4-随机
var operator = new Array(0, 2, 0);
// 混合运算时，运算符多选

// 运算数个数 2-3
var numCount = 3;
// 运算数范围
var range = new Array(
    new Array(10, 99),
    new Array(10, 99),
    new Array(10, 99),
);
// 运算结果范围
var resultRange = new Array(0, 1000);

// 加法是否进位 0-都可 1-必须进位 2-必须不进位
var plusRule = 2;
// 减法是否退位 0-都可 1-必须退位 2-必须不退位
var minusRule = 2;
// 除法是否有余数 0-都可 1-必须有余数 2-必须整除
var divideRule = 2;

// 生成计算题的数量
var resultCount = 10;

run(operator, numCount, range, resultRange, plusRule, minusRule, divideRule, resultCount);

module.exports = { run }