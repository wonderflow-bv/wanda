import { create } from '@storybook/theming';

export default create({
  base: 'dark',
  brandTitle: 'Wanda Design System',
  brandUrl: 'https://design.wonderflow.ai',
  brandImage: "data:image/svg+xml,%3Csvg width='177' height='48' viewBox='0 0 177 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' fill='%23EE0000'/%3E%3Cpath d='M34.6138 12.9892L24.5246 25.2658L21.9993 23.5248L28.484 15.6221V12.9892H24.9021L18.3222 20.9931L15.8466 19.2911L18.86 15.6221V12.9892H15.2744L9.93418 19.4936L9.77777 19.6845V23.665L26.2715 35.0108L38.1804 20.4868L38.2222 20.4323V12.9892H34.6138ZM37.841 20.3076L26.1877 34.5083L10.1669 23.4742V20.1207L25.7185 30.8314L37.841 16.0661V20.3076ZM10.2508 19.7078L15.4537 13.3787H18.4786V15.4819L15.2859 19.3768L18.3947 21.5228L25.0813 13.3787H28.1331V15.4819L21.4348 23.6027L24.5971 25.7799L34.7893 13.3787H37.841V15.4585L25.6345 30.3135L10.2508 19.7078Z' fill='white' stroke='white' stroke-width='0.77027' stroke-miterlimit='10'/%3E%3Cpath d='M68.9784 23H72.434L75.5499 11.6727H75.6202L78.7243 23H82.1799L86.6663 6.09689H82.9999L80.3174 18.209H80.2471L77.1312 6.09689H74.0271L70.9112 18.209H70.8409L68.1701 6.09689H64.5037L68.9784 23ZM90.4265 23.1991C92.0781 23.1991 93.4135 22.4143 94.1281 21.1258H94.1983V23H97.6188V14.3903C97.6188 11.8601 95.522 10.185 92.2773 10.185C88.9623 10.185 86.9709 11.8484 86.7835 14.1677L86.7718 14.3083H89.8994L89.9228 14.2029C90.0868 13.3946 90.8599 12.7972 92.1367 12.7972C93.4721 12.7972 94.1983 13.4883 94.1983 14.6012V15.3743L91.0942 15.5617C87.9783 15.7608 86.2095 17.0962 86.2095 19.3804V19.4038C86.2095 21.6178 87.908 23.1991 90.4265 23.1991ZM89.5948 19.2281V19.2047C89.5948 18.3145 90.2859 17.7522 91.6096 17.6702L94.1983 17.5062V18.4082C94.1983 19.7201 93.0738 20.7041 91.5393 20.7041C90.3562 20.7041 89.5948 20.1535 89.5948 19.2281ZM99.8327 23H103.253V15.7843C103.253 14.1443 104.225 13.0198 105.76 13.0198C107.294 13.0198 108.068 13.9569 108.068 15.5968V23H111.488V14.894C111.488 11.9538 109.918 10.185 107.154 10.185C105.256 10.185 103.968 11.0636 103.323 12.5044H103.253V10.4427H99.8327V23ZM118.305 23.2577C120.121 23.2577 121.503 22.344 122.171 20.8564H122.241V23H125.662V6.09689H122.241V12.6215H122.171C121.492 11.0987 120.086 10.185 118.305 10.185C115.143 10.185 113.198 12.6215 113.198 16.7097V16.7214C113.198 20.7978 115.143 23.2577 118.305 23.2577ZM119.453 20.4229C117.743 20.4229 116.677 19.0056 116.677 16.7214V16.7097C116.677 14.4137 117.755 13.0198 119.453 13.0198C121.105 13.0198 122.253 14.4489 122.253 16.7097V16.7214C122.253 18.9939 121.117 20.4229 119.453 20.4229ZM131.683 23.1991C133.334 23.1991 134.67 22.4143 135.384 21.1258H135.455V23H138.875V14.3903C138.875 11.8601 136.778 10.185 133.534 10.185C130.218 10.185 128.227 11.8484 128.04 14.1677L128.028 14.3083H131.156L131.179 14.2029C131.343 13.3946 132.116 12.7972 133.393 12.7972C134.728 12.7972 135.455 13.4883 135.455 14.6012V15.3743L132.35 15.5617C129.235 15.7608 127.466 17.0962 127.466 19.3804V19.4038C127.466 21.6178 129.164 23.1991 131.683 23.1991ZM130.851 19.2281V19.2047C130.851 18.3145 131.542 17.7522 132.866 17.6702L135.455 17.5062V18.4082C135.455 19.7201 134.33 20.7041 132.796 20.7041C131.612 20.7041 130.851 20.1535 130.851 19.2281Z' fill='%23ffffff'/%3E%3Cpath d='M65.4375 44H69.3047C72.6562 44 74.625 41.9141 74.625 38.3672V38.3516C74.625 34.8125 72.6484 32.7266 69.3047 32.7266H65.4375V44ZM66.8438 42.7344V33.9922H69.2109C71.7109 33.9922 73.1875 35.6172 73.1875 38.3672V38.3828C73.1875 41.125 71.7266 42.7344 69.2109 42.7344H66.8438ZM80.3281 44.1484C82.3125 44.1484 83.5156 43.0234 83.8047 41.8828L83.8203 41.8203H82.4609L82.4297 41.8906C82.2031 42.3984 81.5 42.9375 80.3594 42.9375C78.8594 42.9375 77.8984 41.9219 77.8594 40.1797H83.9219V39.6484C83.9219 37.1328 82.5312 35.4297 80.2422 35.4297C77.9531 35.4297 76.4688 37.2109 76.4688 39.8125V39.8203C76.4688 42.4609 77.9219 44.1484 80.3281 44.1484ZM80.2344 36.6406C81.4766 36.6406 82.3984 37.4297 82.5391 39.0938H77.8828C78.0312 37.4922 78.9844 36.6406 80.2344 36.6406ZM88.9219 44.1484C90.8359 44.1484 92.2969 43.1094 92.2969 41.6094V41.5938C92.2969 40.3906 91.5312 39.7031 89.9453 39.3203L88.6484 39.0078C87.6562 38.7656 87.2344 38.4062 87.2344 37.8359V37.8203C87.2344 37.0781 87.9688 36.5625 88.9688 36.5625C89.9844 36.5625 90.6406 37.0234 90.8203 37.6875H92.1562C91.9688 36.3125 90.7422 35.4297 88.9766 35.4297C87.1875 35.4297 85.8438 36.4844 85.8438 37.8828V37.8906C85.8438 39.1016 86.5547 39.7891 88.1328 40.1641L89.4375 40.4766C90.4766 40.7266 90.9062 41.125 90.9062 41.6953V41.7109C90.9062 42.4766 90.1016 43.0156 88.9688 43.0156C87.8906 43.0156 87.2188 42.5547 86.9922 41.8516H85.6016C85.7578 43.2422 87.0469 44.1484 88.9219 44.1484ZM95.125 33.9531C95.6406 33.9531 96.0625 33.5312 96.0625 33.0156C96.0625 32.5 95.6406 32.0781 95.125 32.0781C94.6094 32.0781 94.1875 32.5 94.1875 33.0156C94.1875 33.5312 94.6094 33.9531 95.125 33.9531ZM94.4375 44H95.7969V35.5781H94.4375V44ZM101.828 46.9688C104.125 46.9688 105.578 45.7656 105.578 43.8828V35.5781H104.219V36.9688H104.125C103.609 36.0156 102.688 35.4297 101.5 35.4297C99.2969 35.4297 97.9375 37.1406 97.9375 39.5V39.5156C97.9375 41.875 99.2891 43.5625 101.469 43.5625C102.625 43.5625 103.578 43.0391 104.109 42.1094H104.234V43.8125C104.234 45.0547 103.336 45.7656 101.828 45.7656C100.617 45.7656 99.8672 45.3125 99.7188 44.6719L99.7109 44.6641H98.3047L98.2891 44.6719C98.5 46.0547 99.7969 46.9688 101.828 46.9688ZM101.766 42.3594C100.203 42.3594 99.3281 41.1875 99.3281 39.5156V39.5C99.3281 37.8281 100.203 36.6328 101.766 36.6328C103.32 36.6328 104.266 37.8281 104.266 39.5V39.5156C104.266 41.1875 103.328 42.3594 101.766 42.3594ZM108.109 44H109.469V39.0156C109.469 37.5391 110.32 36.6328 111.664 36.6328C113.008 36.6328 113.633 37.3594 113.633 38.875V44H114.992V38.5469C114.992 36.5469 113.938 35.4297 112.047 35.4297C110.805 35.4297 110.016 35.9531 109.594 36.8438H109.469V35.5781H108.109V44ZM125.82 44.2656C128.336 44.2656 129.984 42.9531 129.984 40.8438V40.8359C129.984 39.2109 129.055 38.2656 126.703 37.7422L125.453 37.4609C123.922 37.125 123.305 36.5156 123.305 35.6172V35.6094C123.305 34.4297 124.391 33.7656 125.797 33.7578C127.266 33.75 128.203 34.4844 128.359 35.4766L128.375 35.5781H129.781L129.773 35.4688C129.656 33.7891 128.086 32.4609 125.836 32.4609C123.508 32.4609 121.875 33.7812 121.867 35.6484V35.6562C121.867 37.2891 122.844 38.3281 125.102 38.8281L126.352 39.1016C127.898 39.4453 128.547 40.0859 128.547 41.0234V41.0312C128.547 42.1797 127.43 42.9688 125.898 42.9688C124.273 42.9688 123.102 42.2578 123 41.1328L122.992 41.0469H121.586L121.594 41.1328C121.758 42.9688 123.352 44.2656 125.82 44.2656ZM132.875 46.9531C134.367 46.9531 135.062 46.4062 135.758 44.5156L139.047 35.5781H137.617L135.312 42.5078H135.188L132.875 35.5781H131.422L134.539 44.0078L134.383 44.5078C134.078 45.4766 133.609 45.8281 132.836 45.8281C132.648 45.8281 132.438 45.8203 132.273 45.7891V46.9062C132.461 46.9375 132.695 46.9531 132.875 46.9531ZM143.5 44.1484C145.414 44.1484 146.875 43.1094 146.875 41.6094V41.5938C146.875 40.3906 146.109 39.7031 144.523 39.3203L143.227 39.0078C142.234 38.7656 141.812 38.4062 141.812 37.8359V37.8203C141.812 37.0781 142.547 36.5625 143.547 36.5625C144.562 36.5625 145.219 37.0234 145.398 37.6875H146.734C146.547 36.3125 145.32 35.4297 143.555 35.4297C141.766 35.4297 140.422 36.4844 140.422 37.8828V37.8906C140.422 39.1016 141.133 39.7891 142.711 40.1641L144.016 40.4766C145.055 40.7266 145.484 41.125 145.484 41.6953V41.7109C145.484 42.4766 144.68 43.0156 143.547 43.0156C142.469 43.0156 141.797 42.5547 141.57 41.8516H140.18C140.336 43.2422 141.625 44.1484 143.5 44.1484ZM151.898 44.0625C152.164 44.0625 152.422 44.0312 152.688 43.9844V42.8281C152.438 42.8516 152.305 42.8594 152.062 42.8594C151.188 42.8594 150.844 42.4609 150.844 41.4688V36.7031H152.688V35.5781H150.844V33.3984H149.438V35.5781H148.109V36.7031H149.438V41.8125C149.438 43.4219 150.164 44.0625 151.898 44.0625ZM158.031 44.1484C160.016 44.1484 161.219 43.0234 161.508 41.8828L161.523 41.8203H160.164L160.133 41.8906C159.906 42.3984 159.203 42.9375 158.062 42.9375C156.562 42.9375 155.602 41.9219 155.562 40.1797H161.625V39.6484C161.625 37.1328 160.234 35.4297 157.945 35.4297C155.656 35.4297 154.172 37.2109 154.172 39.8125V39.8203C154.172 42.4609 155.625 44.1484 158.031 44.1484ZM157.938 36.6406C159.18 36.6406 160.102 37.4297 160.242 39.0938H155.586C155.734 37.4922 156.688 36.6406 157.938 36.6406ZM163.734 44H165.094V38.7812C165.094 37.5938 165.93 36.6328 167.031 36.6328C168.094 36.6328 168.781 37.2812 168.781 38.2812V44H170.141V38.5859C170.141 37.5156 170.914 36.6328 172.086 36.6328C173.273 36.6328 173.844 37.25 173.844 38.4922V44H175.203V38.1797C175.203 36.4141 174.242 35.4297 172.523 35.4297C171.359 35.4297 170.398 36.0156 169.945 36.9062H169.82C169.43 36.0312 168.633 35.4297 167.492 35.4297C166.391 35.4297 165.594 35.9531 165.219 36.8594H165.094V35.5781H163.734V44Z' fill='%239DA4B2'/%3E%3C/svg%3E",
  colorPrimary: '#EE0000',
  colorSecondary: '#57C3D1',

  // UI
  appBg: '#151515',
  appBorderColor: `#1F2227`,

  // Typography
  fontBase: '"Open Sans", sans-serif',

  // Toolbar default and active colors
  barTextColor: '#D4D8E0',
  barSelectedColor: '#D4D8E0',
});
