**O que esse componente faz?** <br>
PointRouteDragger é um componente para traçar pontos em uma tela utilizando javascript, canvas, jquery e Bootstrap 5.0. <br>

![demo](https://user-images.githubusercontent.com/86023272/136871486-22d814ff-a236-4324-a0ba-92b8dbb30021.gif)

**Como utilizá-lo?** <br>
Declare no HTML o arquivo **"mapDrgRt.css"**.<br>
_Ex:_ <br>
![image](https://user-images.githubusercontent.com/86023272/136872148-6e00384b-7793-4c76-ae52-138d94d9ad46.png) <br>

E o arquivo **"mapDrgRt.js"**.
_Ex:_ <br>
![image](https://user-images.githubusercontent.com/86023272/136872226-fd13e403-ce3d-4050-8cd6-7b6a7a2fed83.png)

E por fim, declare a classe "map-drg-rt" no elemento que desejar.
_Ex:_ <br>
![image](https://user-images.githubusercontent.com/86023272/136872322-0c614de3-0cea-43ae-b523-723da0865c3b.png) <br>

O Bootstrap e o JQuery podem ser declarados da forma como preferir, no exemplo disponibilizado existem links remotos caso queira utilizar. <br>

Para chamar o componente use a função **"MapDragRoute.create(callback)**. <br>
Ao clicar no botão confirmar o callback será chamado <br>
retornando a rota na ordem em que foi traçada pelo usuário no formato _String_. <br>

**Dúvidas e/ou sugestões entre em contato**
