import MasterCard from './MasterCard.vue'
import Visa from './Visa.vue'
import Amex from './Amex.vue'
import Discover from './Discover.vue'
import Paypal from './Paypal.vue'
import UnionPay from './UnionPay.vue'
import Maestro from './Maestro.vue'
import AliPay from './AliPay.vue'
import CodeFront from './CodeFront.vue'
import Code from './Code.vue'
import Diners from './Diners.vue'
import Elo from './Elo.vue'
import Generic from './Generic.vue'
import Jcb from './Jcb.vue'

export * from './Ellipse.vue'
export { default as AuthLogo } from './AuthLogo.vue'
export { default as EllipseGroup } from './EllipseGroup.vue'
export { default as Placeholder } from './Placeholder.vue'
export const paymentCards = {
  MasterCard,
  Visa,
  Amex,
  Discover,
  Paypal,
  UnionPay,
  Maestro,
  AliPay,
  CodeFront,
  Code,
  Diners,
  Elo,
  Generic,
  Jcb
}
