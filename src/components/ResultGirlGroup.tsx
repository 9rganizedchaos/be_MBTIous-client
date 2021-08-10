import styled, { css } from 'styled-components';
import { motion } from "framer-motion";

interface GirlGroupContainerProps {
  girlGroupIndex: any;
}

const ResultGirlGroupContainer = styled(motion.div)<GirlGroupContainerProps>`
${( { theme, girlGroupIndex } ) => {
  return css`
background: ${theme.color.sub};
border: 3px solid ${theme.color.main};
border-right: none;
width: 400px;
height: 500px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
font-weight: 800;
font-style: italic;
overflow-y: scroll;
color: ${theme.color.main};
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: ${theme.color.sub};
  border: 2px solid ${theme.color.main};
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background-color: ${theme.color.main};
  width: 100px;
}
z-index: ${girlGroupIndex}
`
}}
`;

const ResultGirlGroup = function(props: any){
  return (
    <ResultGirlGroupContainer className="girlGroup" onClick={props.handleResultComponentClick} girlGroupIndex={props.girlGroupIndex} drag dragConstraints={props.constraintsRef}>
      <span className="girlGroup">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim error non commodi odio unde expedita ullam voluptate fuga quibusdam animi vitae, dolorem temporibus doloribus sapiente. Repellendus aperiam qui nulla eos, mollitia minus voluptatum modi quidem minima obcaecati doloremque distinctio rem veniam aspernatur in, placeat repudiandae at similique corrupti. Odit, ducimus facere? Neque nobis maxime recusandae a impedit, unde similique dolore beatae et dolorum provident! Beatae explicabo placeat aliquam blanditiis ipsum. Nisi voluptatum voluptatem similique hic pariatur, aliquid libero vel consequuntur nihil recusandae ullam iusto natus officia autem? Ullam omnis perferendis facere necessitatibus libero ut tempora ex corrupti, velit excepturi debitis distinctio minima provident hic sunt sequi cum repudiandae maxime dolorem nostrum dolorum veritatis neque beatae? Vel labore adipisci fuga officiis delectus? At explicabo beatae autem quaerat similique dolores corporis dignissimos saepe! Nam iusto sequi ratione aliquam itaque officia minima, suscipit est quos ipsa alias odit. Obcaecati necessitatibus beatae inventore itaque maxime, officiis eaque praesentium temporibus quaerat quam nam perspiciatis. Cupiditate ipsa deserunt harum magni rem accusantium, iste inventore minima quibusdam optio voluptatibus ipsum reprehenderit explicabo nobis repellendus illum vitae eligendi recusandae reiciendis, atque asperiores tempore ad. A in numquam dolor voluptatem eius cum at rem possimus libero reprehenderit animi quisquam cumque debitis similique, esse dolorem non. Nihil placeat dicta ex in consequatur eveniet ut ipsam vitae non incidunt expedita cumque voluptatum molestias aspernatur, quo necessitatibus quod voluptatibus facere veniam sed! Sequi officiis a vero earum blanditiis totam ipsum vel corporis facilis dolores quisquam nemo et, tempore illo! Fugit magni vel quia quam voluptatem hic quo fugiat libero non, exercitationem provident iste harum sit necessitatibus eum. Neque officiis id numquam. Reiciendis eos repellat fugit aliquam inventore. Cumque, voluptatibus facilis exercitationem accusamus aliquid harum facere voluptatum ex nulla enim, eveniet eos laborum modi delectus alias libero omnis cupiditate! Nihil qui repellendus maxime sint aliquam. Dicta officia quibusdam explicabo porro id quia pariatur animi quo doloribus qui, quis modi ad, exercitationem aut, vitae harum laboriosam dolore. Labore quasi quaerat quos qui nobis ea maiores quia fugit quisquam, ipsum eos nostrum ratione hic perspiciatis architecto, sint ex. Earum quia aut veritatis, quibusdam consequatur nisi hic reiciendis ducimus impedit facere eaque error eum itaque harum vitae ad neque, soluta nihil voluptatem, consectetur illo nostrum corporis fugiat velit? Alias architecto, quia modi voluptatem eum perferendis cupiditate aspernatur ipsa incidunt placeat suscipit molestias velit tempora debitis, consectetur omnis excepturi, temporibus quae nemo? Consequatur voluptatum adipisci odit vitae iure quibusdam quia nesciunt reprehenderit maxime sed quod vero, voluptate est, repellendus vel asperiores laborum aspernatur quas natus labore a architecto! Enim maiores id quis ut mollitia quos repellendus nulla animi autem soluta! Deleniti consequuntur culpa similique vel possimus velit accusantium! Ullam, a nobis praesentium deleniti ipsum sit laudantium atque voluptas quidem suscipit eligendi doloremque aliquid cum vero ea officia impedit incidunt odio aliquam ab facilis. Veritatis, reprehenderit molestias. Unde nisi sint laborum iusto maxime quas aliquid id esse harum quidem minima fugiat impedit quasi voluptas, obcaecati reprehenderit illo! Repellat incidunt doloremque error necessitatibus soluta possimus rerum consectetur autem expedita quo similique ipsam quis fugit illo, atque dolore deleniti sit reiciendis ex fugiat reprehenderit voluptate id quae repudiandae. Explicabo quam error maxime expedita deserunt inventore quibusdam, quisquam quae amet quis rerum sint facere. Et, at, excepturi facere iure in cum modi inventore veritatis eos odit asperiores magni accusantium ad dolorem assumenda fuga expedita temporibus nulla autem. Ducimus laudantium consequatur libero, quibusdam maiores assumenda id eum magni earum iste, eveniet, aut ipsa. Nesciunt laudantium eaque excepturi mollitia pariatur. Voluptatibus, libero assumenda recusandae nesciunt doloribus repellendus. Ipsa iste delectus ad exercitationem! Tempora, unde dolore explicabo, natus vel minima, eaque aut tempore quisquam quidem voluptate esse. Numquam provident eveniet unde soluta amet cupiditate ducimus similique quos cum ipsa distinctio totam, quidem vel consequatur odit quo harum dolore nam sed voluptas a pariatur qui. Aperiam laborum impedit maiores consequatur tempore vitae aut quasi corporis asperiores facere! Asperiores, dignissimos placeat quo velit a est reiciendis omnis, pariatur quae veritatis dolores iure nostrum at, eius accusantium odit odio. Deleniti, quisquam alias. Inventore, illo sapiente ipsam quisquam blanditiis voluptatem perferendis temporibus quis veritatis tempora id iste necessitatibus voluptate assumenda qui neque est laborum facilis minus, dolore, laudantium laboriosam hic. Debitis ab, reiciendis, hic quas repellendus vitae omnis similique veniam facere vel animi sunt ipsam quia porro. Temporibus molestias nemo ipsa asperiores veniam repellendus id suscipit ratione praesentium dolorem dicta quasi, neque eum vero saepe tenetur nam, corrupti excepturi minima assumenda qui cupiditate culpa vel tempora? Alias consectetur asperiores reprehenderit ad aspernatur ut vitae quasi excepturi! Dolores facere voluptates odit sapiente, consectetur possimus? Non ea ut laboriosam! Labore, doloribus ab sed iste eius deleniti suscipit sit iusto, ullam eum rem, voluptatem cumque reiciendis assumenda error laborum. Numquam saepe laudantium voluptatem inventore iste consectetur ullam reiciendis placeat minus, optio est, atque voluptate totam dolor voluptatibus, officiis quo praesentium error architecto? Ipsam cupiditate nulla fuga inventore quos accusantium culpa facere maxime, qui accusamus voluptate, aperiam quisquam repudiandae atque quam laboriosam odio incidunt modi ullam perspiciatis. Aut atque placeat quasi veritatis voluptas illo quibusdam beatae, eos, a in consectetur? Eum assumenda maxime unde veritatis optio perspiciatis, expedita molestiae magni in aliquam deserunt architecto sint rerum sapiente pariatur voluptatibus nobis ipsam obcaecati accusamus at. Nemo, porro repudiandae aperiam unde adipisci, at ipsam pariatur neque rem quo nesciunt molestiae asperiores dolores qui ad! Ducimus, nulla ipsa aliquam dignissimos accusamus, quo vel, impedit in explicabo quod ab! Ut earum nemo odio, nostrum fugiat libero autem animi ipsa dolorem non dolore! Accusantium, facilis. Harum magni commodi blanditiis repellat odit mollitia dolorem quae veritatis ratione? Consectetur quos voluptas magni neque autem! Nesciunt reprehenderit quas, officiis tenetur veniam incidunt assumenda, recusandae quam, dolorum voluptatum cum sed expedita optio debitis laudantium ipsa omnis. Incidunt perspiciatis architecto fugiat rerum facere natus, illum in mollitia itaque quae eaque sunt totam voluptate, sequi eos assumenda delectus nostrum repellendus quidem reprehenderit consequuntur nihil culpa. Vero deleniti quaerat voluptatum itaque quas assumenda, ipsam earum quisquam similique eum eligendi totam! Placeat perferendis mollitia ducimus, nam iusto tempore quod saepe vitae illo ea, numquam a?</span>
    </ResultGirlGroupContainer>    
  )
}

export default ResultGirlGroup ;