import clsx from 'clsx'
import { forwardRef, ImgHTMLAttributes } from 'react'
import styles from './avatar.module.css'

export type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  /**
   * The source of the image to use as avatar
   */
  src?: string;
  /**
   * Define the size of the avatar
   */
  dimension?: 'small' | 'regular' | 'big';
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(({
  className,
  src,
  dimension = 'regular',
  ...otherProps
}, forwardedRef) => {
  return (
    <picture
      className={clsx(styles.Avatar, className)}
      data-avatar-dimension={dimension}
    >
      <svg
        aria-hidden="true"
        className={styles.Placeholder}
        height={18}
        viewBox="0 0 12 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity={0.7}
          d="M6 0C3.795 0 2 1.794 2 4s1.795 4 4 4 4-1.794 4-4-1.795-4-4-4z"
          fill="var(--highlight-blue-foreground)"
        />
        <path
          d="M8.4 9H3.6C1.612 9 0 10.575 0 12.531v5.126C1.814 18.517 3.85 19 6 19s4.186-.483 6-1.343v-5.126C12 10.581 10.394 9 8.4 9z"
          fill="var(--highlight-blue-foreground)"
        />
      </svg>

      {src && (
        <img
          ref={forwardedRef}
          alt=""
          src={src}
          {...otherProps}
        />
      )}
    </picture>
  )
})

Avatar.displayName = 'Avatar'
