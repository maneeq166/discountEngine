

class DiscountRule {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }

  isApplicable(order) {
    throw new Error("isApplicable() not implemented");
  }

  apply(order) {
    throw new Error("apply() not implemented");
  }
}


class NewCustomerRule extends DiscountRule {
  constructor() {
    super("NEW_CUSTOMER_10_PERCENT", 1);
  }

  isApplicable(order) {
    return order.customerType === "NEW";
  }

  apply(order) {
    return order.orderTotal * 0.9;
  }
}

class HighValueOrderRule extends DiscountRule {
  constructor() {
    super("ABOVE_10000_FLAT_500", 2);
  }

  isApplicable(order) {
    return order.orderTotal > 10000;
  }

  apply(order) {
    return order.orderTotal - 500;
  }
}

class WednesdayRule extends DiscountRule {
  constructor() {
    super("WEDNESDAY_5_PERCENT", 3);
  }

  isApplicable(order) {
    return order.dayOfWeek === "WEDNESDAY";
  }

  apply(order) {
    return order.orderTotal * 0.95;
  }
}



class DiscountEngine {
  constructor() {
    this.rules = [];
  }

  registerRule(rule) {
    this.rules.push(rule);
    this.rules.sort((a, b) => a.priority - b.priority);
  }

  applyDiscount(order) {
    for (let rule of this.rules) {
      if (rule.isApplicable(order)) {
        const finalAmount = rule.apply(order);
        return {
          originalAmount: order.orderTotal,
          finalAmount,
          discountApplied: rule.name
        };
      }
    }

    return {
      originalAmount: order.orderTotal,
      finalAmount: order.orderTotal,
      discountApplied: "NONE"
    };
  }
}



const engine = new DiscountEngine();

engine.registerRule(new NewCustomerRule());
engine.registerRule(new HighValueOrderRule());
engine.registerRule(new WednesdayRule());

const order = {
  customerType: "NEW",
  items: [
    { productId: 1, category: "Shoes", price: 4000 },
    { productId: 2, category: "Watch", price: 3000 }
  ],
  orderTotal: 7000,
  dayOfWeek: "WEDNESDAY"
};

const result = engine.applyDiscount(order);
console.log(result);
