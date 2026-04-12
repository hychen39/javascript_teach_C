import dayjs from "dayjs";

let order = {
    id: "ORD-001",
    totalAmount: 1000,
    paidAt: "2026-03-22",
    couponExpiredAt: "2026-03-25"
};

let now = dayjs("2026-03-24");

if (now.isBefore(dayjs(order.couponExpiredAt))) {
    console.log("Coupon 可用");
}

let shipDate = dayjs(order.paidAt).add(3, "day");

let message = `訂單：${order.id} 出貨日：${shipDate.format("YYYY-MM-DD")}`;

console.log(message);
