/* eslint-disable max-len */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import {
  Button, OverlayContainer, Stack, useOverlayContext,
} from '../..';
import { Drawer } from './drawer';

const story: ComponentMeta<typeof Drawer> = {
  title: 'Dialogs/Drawer',
  component: Drawer,
  args: {
    side: 'right',
    title: 'Drawer title',
    closeOnClickOutside: true,
    isModal: true,
  },
  argTypes: {
    side: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const DrawerShell: ComponentStory<typeof Drawer> = ({ children, ...args }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Drawer</Button>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi mollitia consequuntur in corrupti debitis, quidem, cupiditate omnis consectetur ratione saepe necessitatibus voluptatibus ex illo magnam totam voluptas eos at eaque?
      Earum obcaecati aliquid, illum illo commodi, eius impedit fuga ratione itaque consectetur officia iure eveniet. Odit enim minima numquam vitae dolores voluptatum illo quae, voluptatibus, ducimus, provident tenetur quaerat accusantium.
      Deserunt distinctio in eum possimus reprehenderit iure et quis porro ipsa error magnam numquam, autem alias odit totam fuga minima neque, ducimus placeat? Voluptatum eos eaque delectus. Natus, consectetur repudiandae.
      Tenetur, illo iste? Repellat sed ex, laudantium saepe provident adipisci libero dolor in facere ullam quaerat itaque aperiam ab distinctio tempora doloremque. Ab reiciendis ex, esse expedita possimus suscipit eos?
      Ullam totam dicta quo ex voluptatibus maxime quos eum autem, qui, tempore sint? Eum maiores quibusdam ratione, deleniti asperiores officiis blanditiis explicabo, reiciendis natus numquam quae vero? Repudiandae, placeat illo?
      Officiis est incidunt, non et error magnam distinctio reiciendis nihil molestiae dolor perferendis quae iste nulla facere sed culpa expedita debitis architecto explicabo ea nisi neque itaque, fugiat ex. Beatae!
      Molestiae, unde porro quia tempora quis possimus laudantium doloremque sapiente voluptas, natus nemo quas magnam impedit cum cupiditate facere cumque. Fugit inventore laborum architecto sapiente vero perspiciatis iusto, praesentium repudiandae.
      Aliquid nobis natus facilis assumenda nihil nam ducimus, deserunt quia, rerum hic illo! Porro numquam ducimus ea, odit vero officiis itaque placeat provident ad labore veniam quam dicta asperiores ex.
      Architecto aspernatur eaque repellat facilis molestias odit maxime asperiores temporibus porro id atque aliquam, dolor enim modi in quaerat laudantium cumque deleniti, harum, eveniet ducimus distinctio error? Ad, cum magnam?
      Quos recusandae, dolore eum mollitia iste error dolores, provident vero cum ab, accusamus modi consequuntur? Voluptate, voluptates porro dolore eligendi quis ad ab nisi error voluptatibus, praesentium explicabo veniam ipsa.
      Incidunt, dignissimos quia saepe eveniet fugit, aspernatur distinctio quos doloribus possimus non molestias asperiores, aperiam ipsam. Reiciendis debitis ipsum modi veniam! Reprehenderit cum repellat est exercitationem, quae sunt dicta voluptatem!
      Unde sapiente vitae corrupti magnam asperiores dignissimos minima? Consectetur dolorem aperiam amet accusantium assumenda sunt explicabo aliquid eos, minima doloremque voluptate numquam optio, doloribus cum, quas molestias vitae nostrum aut?
      Necessitatibus magni ullam temporibus deserunt consequuntur maiores deleniti repellat pariatur voluptatem nostrum incidunt accusantium quo itaque, similique dignissimos vero facilis blanditiis tempora odit delectus. Nisi ex repellendus ipsum rem tempore.
      Dolor cum iure error, dignissimos reprehenderit eaque atque, nihil et odio, optio corporis unde veritatis saepe vel laboriosam obcaecati quas maiores ducimus fugiat! Nam quas vel laborum expedita esse illum!
      Distinctio harum porro magnam animi aspernatur saepe debitis quidem. Commodi minima assumenda laboriosam veniam, necessitatibus nesciunt consequatur distinctio ipsam obcaecati laudantium fugit temporibus dolorum accusantium porro, praesentium ab voluptatibus iste.
      Provident, nemo! Magnam corporis beatae dolorem pariatur sit consequuntur quisquam recusandae doloremque non, aut earum adipisci molestiae? Nulla est eos cupiditate ad nesciunt quas deleniti eligendi? Hic pariatur impedit quas.
      Vero asperiores sed quos placeat eaque! Voluptatibus atque ex id amet dicta aperiam tempora nisi nobis possimus beatae, quas ab. Fuga maxime obcaecati ex consequuntur pariatur sunt labore numquam assumenda!
      Officia excepturi quis atque at modi eveniet reiciendis dignissimos debitis quo ullam? Facere nulla modi dicta eligendi nam rerum sunt nostrum laudantium repudiandae ducimus, suscipit in fugit omnis nihil sint?
      Maxime, eaque similique nisi omnis officia, non suscipit illo facilis odio dolorem atque iusto placeat architecto repudiandae? Eum doloremque minima, aperiam maiores repudiandae suscipit, dignissimos autem at aspernatur, porro omnis.
      Beatae minima veniam a. Ipsa laboriosam tenetur dicta perspiciatis earum amet asperiores ad nostrum optio laborum quod at, rem animi libero inventore omnis numquam temporibus, voluptatibus delectus distinctio quas eos.
      Voluptate accusamus excepturi, quae perferendis molestiae aliquid reiciendis quo. Debitis aperiam soluta libero aut impedit suscipit minus exercitationem, dolorum reprehenderit modi velit hic rem illum minima doloremque ducimus harum eos!
      Odio accusantium mollitia commodi distinctio corporis! Quasi itaque vel soluta odit tempore distinctio ab deleniti, fugiat libero architecto praesentium quae blanditiis molestias eum reiciendis ex quidem fugit voluptatibus dignissimos quia.
      Eum minima voluptatibus illo nihil illum praesentium voluptatem, quod fuga amet. Quo sequi sapiente voluptas, alias aspernatur soluta inventore nesciunt quasi quas, itaque similique. Incidunt unde maiores ipsam dolorem modi.
      Mollitia, debitis adipisci accusamus cumque iste a repudiandae eveniet possimus ratione blanditiis autem. Distinctio quibusdam excepturi saepe eaque beatae perferendis? Perferendis quasi veniam consequatur consequuntur corporis, et magnam soluta earum?
      Cum nostrum provident harum ducimus dolorem ipsa vel pariatur ratione non dicta, reiciendis delectus odit perferendis assumenda. Doloremque odit sit, architecto impedit corporis neque ea inventore repellendus! Officiis, quod dolorum.
      Alias atque molestias asperiores debitis voluptates. Eveniet saepe perferendis, ipsam, dolores dignissimos laborum aut officia maiores molestiae doloribus nam ullam iusto aperiam, maxime dolorum autem repudiandae beatae nesciunt facilis. Provident.
      Quas quos fuga ipsa in. Quam vero aperiam esse ex aliquam. Autem officiis, nam porro id veritatis alias laudantium maxime reprehenderit repellendus, distinctio iure perspiciatis optio nihil dicta, obcaecati neque.
      Est repellendus ex ipsum autem ducimus adipisci maxime odio facere minima veritatis pariatur accusamus quo perspiciatis rerum tempora, hic sint nemo a cumque quia doloribus impedit? Sapiente dignissimos omnis iusto.
      Blanditiis incidunt, ad officia nam alias voluptatibus autem non exercitationem esse iste quos sequi sint! Enim in magnam facilis, non, officiis, consequuntur esse omnis soluta tempora dolorem porro. Similique, non!
      Sed quasi, alias nostrum eveniet odit labore cumque consequuntur exercitationem ullam ratione sint facilis veniam, explicabo ad quas, minima corrupti obcaecati laboriosam reprehenderit omnis mollitia similique veritatis velit nihil! Quam.
      Voluptatum placeat harum quis exercitationem expedita voluptates saepe ea, in doloremque ab necessitatibus reprehenderit ipsum, perferendis deleniti magni voluptas sapiente voluptate dolore suscipit doloribus nobis optio atque. Quos, enim quod?
      Ut minima architecto eum temporibus nemo laboriosam corrupti, blanditiis nihil iusto optio aliquam voluptate reiciendis. Consectetur et quas unde. Distinctio cum quae molestias, doloribus numquam soluta totam dolores accusantium vel.
      Optio explicabo eligendi repudiandae sit dolorum, exercitationem perferendis quam aut animi necessitatibus ullam et neque quis deserunt! Doloribus molestias, voluptatibus iusto quae mollitia libero laborum necessitatibus esse, odit atque qui?
      Illum dolorem tempore iste magni! Culpa id beatae et minus, porro maiores rerum modi architecto perspiciatis at non deleniti quos quia veniam eveniet animi consectetur quas in voluptate sequi impedit?
      Culpa, nesciunt necessitatibus incidunt nihil ea possimus explicabo facere quos voluptatum unde exercitationem minus? Amet, eaque beatae. Tenetur, officiis alias debitis architecto assumenda quibusdam accusamus nam illo ipsa, ab dignissimos!
      Dolores totam quis, voluptates asperiores suscipit, inventore cum rem alias expedita natus hic aliquam aperiam eveniet consequatur necessitatibus. Odit, repellat modi cupiditate voluptatem eos earum autem dolor neque velit commodi?
      Iusto dolores blanditiis a! Doloribus quibusdam ipsa quas illum sapiente labore totam consequatur provident delectus id exercitationem alias nostrum voluptatem quidem, impedit a facilis at accusamus eveniet quaerat earum! Quia.
      Laboriosam assumenda, rem corrupti necessitatibus tempora amet omnis? Odio impedit culpa reprehenderit eligendi ex alias sed aliquid eum perspiciatis at iste esse laudantium voluptates omnis aliquam delectus voluptatum, praesentium saepe!
      Animi consequuntur non est reprehenderit obcaecati consequatur reiciendis pariatur. Eligendi consequuntur distinctio voluptatem error fuga dolores! Excepturi, molestiae, nemo fuga saepe, porro consequatur ea at necessitatibus accusantium animi nostrum. Facere!
      Eligendi aut debitis in nam? Ducimus laboriosam quos iste quidem officia. Fugit soluta dolore deleniti, explicabo accusamus fugiat veritatis, laboriosam suscipit ab mollitia numquam pariatur quaerat dolorum ipsam consectetur! Dolore.
      Deserunt dolor veniam autem aspernatur architecto a labore, officiis nostrum expedita, eum sequi nihil consequatur quasi iusto unde libero modi laborum suscipit consequuntur molestiae. Est pariatur alias rerum hic sunt.
      Magni, placeat quae ut neque asperiores illo debitis praesentium, ducimus reprehenderit, obcaecati est sapiente dicta quibusdam earum! Vero autem cum ea aperiam eligendi earum quis voluptas, aliquid sequi, voluptates sit.
      Quasi voluptate unde ut dolorum quod laborum excepturi aliquid architecto sunt. Quam numquam sed reprehenderit optio facere, dolor dicta harum tempora adipisci. Quia nobis laboriosam tempore voluptatum vitae sapiente corrupti?
      Aspernatur architecto asperiores delectus facere. Ad repellendus natus odio architecto esse illo illum dolore sint a nesciunt, dicta, eum commodi. Praesentium et soluta repellendus adipisci porro illum voluptatum consectetur cupiditate?
      Minima, dicta reprehenderit? Itaque dolores tenetur recusandae ipsa harum. Unde, doloribus. Voluptatibus perferendis quisquam sit atque quae laborum ut voluptates tenetur sed nulla nam pariatur enim, harum nostrum minus illo.
      Dolores veritatis quibusdam sunt, eaque consequuntur aut? Sit earum dolorem commodi nemo qui ipsum ut excepturi ea labore animi, numquam provident soluta, optio nulla, nihil quas eligendi saepe natus omnis.
      Doloremque iusto sapiente provident vero sed consequatur in eaque commodi! Aliquid doloremque maxime aperiam alias a, temporibus voluptatibus similique repellat, accusantium corporis consectetur commodi earum consequuntur reiciendis quia facere. Reprehenderit.
      Quibusdam aliquam ipsam praesentium? Eaque officiis officia ad nobis aspernatur iste nam enim, eius veritatis non excepturi aliquam sed deserunt qui nihil eveniet facilis! Necessitatibus asperiores ut repellendus repudiandae in?
      Ipsum odio minima excepturi eaque laboriosam cupiditate repudiandae dolorem, magnam architecto sint perferendis optio, voluptas eligendi doloribus dignissimos illo quis. Voluptatem odio alias, nesciunt architecto voluptatibus delectus aspernatur suscipit sequi?
      Similique dolore esse tempore eligendi. Quo accusamus veniam similique odio necessitatibus nostrum perspiciatis at corporis autem rem aliquid atque veritatis ducimus praesentium tenetur, doloremque perferendis? Dolorum fugiat tenetur cupiditate cum!
      <OverlayContainer obfuscate={args.isModal} onClose={() => setIsVisible(false)}>
        {isVisible && (
          <Drawer {...args}>
            {children}
          </Drawer>
        )}
      </OverlayContainer>
    </>
  );
};

const CustomContentDrawer: ComponentStory<typeof Drawer> = () => {
  const { onClose } = useOverlayContext();

  return (
    <Stack
      vAlign="center"
      vPadding={24}
      hPadding={24}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod ducimus libero magni earum perspiciatis.
      <img width="100%" alt="" height="auto" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
      <Button onClick={onClose}>Close drawer</Button>
    </Stack>
  );
};

const DefaultTemplate: ComponentStory<typeof Drawer> = args => (
  <DrawerShell {...args}>
    <CustomContentDrawer />
  </DrawerShell>
);
export const Default = DefaultTemplate.bind({});
export const NonModal = DefaultTemplate.bind({});
NonModal.args = {
  closeOnClickOutside: false,
  isModal: false,
};
