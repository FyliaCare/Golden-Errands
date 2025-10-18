// Type definitions for Golden Errands - SQLite compatible enums as string literals

export const UserRole = {
  ADMIN: 'ADMIN',
  DISPATCH_MANAGER: 'DISPATCH_MANAGER',
  DRIVER: 'DRIVER',
  CUSTOMER: 'CUSTOMER',
  FINANCE: 'FINANCE',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
} as const;

export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  ASSIGNED: 'ASSIGNED',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const DeliveryType = {
  FOOD_DELIVERY: 'FOOD_DELIVERY',
  PARCEL_DELIVERY: 'PARCEL_DELIVERY',
  GROCERY_ERRANDS: 'GROCERY_ERRANDS',
  PHARMACEUTICAL: 'PHARMACEUTICAL',
  BUS_STATION_PICKUP: 'BUS_STATION_PICKUP',
  ONLINE_SHOPS: 'ONLINE_SHOPS',
  PERSONAL_ERRANDS: 'PERSONAL_ERRANDS',
  OTHER: 'OTHER',
} as const;

export type DeliveryType = typeof DeliveryType[keyof typeof DeliveryType];

export const PackageSize = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  EXTRA_LARGE: 'EXTRA_LARGE',
} as const;

export type PackageSize = typeof PackageSize[keyof typeof PackageSize];

export const PaymentMethod = {
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  ONLINE_CARD: 'ONLINE_CARD',
  MOBILE_MONEY: 'MOBILE_MONEY',
  WALLET: 'WALLET',
} as const;

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

export const VehicleType = {
  MOTORCYCLE: 'MOTORCYCLE',
  BICYCLE: 'BICYCLE',
  CAR: 'CAR',
  VAN: 'VAN',
  TRUCK: 'TRUCK',
} as const;

export type VehicleType = typeof VehicleType[keyof typeof VehicleType];

export const VehicleStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MAINTENANCE: 'MAINTENANCE',
} as const;

export type VehicleStatus = typeof VehicleStatus[keyof typeof VehicleStatus];

export const NotificationType = {
  ORDER_CREATED: 'ORDER_CREATED',
  ORDER_ASSIGNED: 'ORDER_ASSIGNED',
  ORDER_PICKED_UP: 'ORDER_PICKED_UP',
  ORDER_DELIVERED: 'ORDER_DELIVERED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  DRIVER_NEARBY: 'DRIVER_NEARBY',
  DELIVERY_DELAYED: 'DELIVERY_DELAYED',
  SYSTEM_ALERT: 'SYSTEM_ALERT',
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];

// Array exports for validation
export const UserRoleValues = Object.values(UserRole);
export const UserStatusValues = Object.values(UserStatus);
export const OrderStatusValues = Object.values(OrderStatus);
export const DeliveryTypeValues = Object.values(DeliveryType);
export const PackageSizeValues = Object.values(PackageSize);
export const PaymentMethodValues = Object.values(PaymentMethod);
export const PaymentStatusValues = Object.values(PaymentStatus);
export const VehicleTypeValues = Object.values(VehicleType);
export const VehicleStatusValues = Object.values(VehicleStatus);
export const NotificationTypeValues = Object.values(NotificationType);