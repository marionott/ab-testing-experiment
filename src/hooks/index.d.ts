import { ProductCardProps } from '~/components/UI/ProductCard/types'

export interface ProductTrackingObject extends ProductCardProps {
  index?: number
  designer?: string | string[]
  categories?: string[]
  sku?: string
  size?: string
  quantity?: number
  variantId?: string | number
}
