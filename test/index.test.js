const { run } = require('../src');

test('addition', () => {
  console.log = jest.fn()

  var operator = [0]

  var numCount = 2;
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

  expect(console.log.mock.calls[0][0]).toContainEqual("+")
});