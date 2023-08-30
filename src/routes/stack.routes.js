import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DadoPedido from "../pages/pedido/DadoPedido";
import BuscaGeral from "../pages/principal/BuscaGeral";
import BuscaPorProdutorItem from "../pages/principal/BuscaPorProdutorItem";
import BuscarPorItem from "../pages/principal/BuscarPorItem";
import TelaPrincipalAba from "../pages/principal/TelaPrincipalAba";
import ProdutosProdutor from "../pages/produto/ProdutosProdutor";
import ProdutoDetalhe from "../pages/produto/ProdutoDetalhe";
import ProdutorCategoriaList from "../pages/produtor/ProdutorCategoriaList";
import ProdutorMaisPedidosList from "../pages/produtor/ProdutorMaisPedidosList";
import VerSacola from "../pages/pedido/VerSacola";
import SelecionarEntregaRetirada from "../pages/pedido/SelecionarEntregaRetirada";
import SelecionarRetirada from "../pages/pedido/SelecionarRetirada";
import ConfirmarPedido from "../pages/pedido/ConfirmarPedido";
import FinalizarPedido from "../pages/pedido/FinalizarPedido";
import TelaPrincipalFiltro from "../pages/principal/TelaPrincipalFiltro";
import FavoritosList from "../pages/favoritos/FavoritosList";
import Notificacoes from "../pages/notificacao/NotificacoesList";
import TelaPerfil from "../pages/usuario/TelaPerfil";
import MapaProdutores from "../pages/mapa/MapaProdutores";
import Usuario from "../pages/usuario/Usuario";
import AlteraPerfilUsuario from "../pages/usuario/AlteraPerfilUsuario";
import EnderecoFormulario from "../pages/endereco/EnderecoFormulario";
import EnderecoListagem from "../pages/endereco/EnderecoListagem";
import PedidosHistorico from "../pages/pedido/PedidosHistorico";
import DadoPedido from "../pages/pedido/DadoPedido";
import UsuarioComercio from "../pages/usuario/UsuarioComercio";
import ComercioList from "../pages/comercio/ComercioList";
import ComercioForm from "../pages/comercio/ComercioForm";
import ComercioEnderecoList from "../pages/comercio/ComercioEnderecoList";
import ComercioEnderecoForm from "../pages/comercio/ComercioEnderecoForm";
import AvaliacaoList from "../pages/avalicao/AvaliacaoList";
import ProdutorForm from "../pages/produtor/ProdutorForm";
import ProdutorListADM from "../pages/produtor/ProdutorListADM";
import ProdutoList from "../pages/produto/ProdutoList";
import EstoqueList from "../pages/pedido/EstoqueList";
import ProdutorPerfil from "../pages/produtor/ProdutorPerfil";
import ProdutosProdutor from "../pages/produto/ProdutosProdutor";
import EnderecoForm from "../pages/endereco/EnderecoForm";
import EnderecoList from "../pages/endereco/EnderecoList";
import ProdutoForm from "../pages/produto/ProdutoForm";
import EnderecosProdutor from "../pages/endereco/EnderecosProdutor";
import ProdutorForm from "../pages/produtor/ProdutorForm";
import EnderecosUsuario from "../pages/usuario/EnderecosUsuario";
import Login from "../pages/login/Login";
import TelaCadastroUsuario from "../pages/login/TelaCadastroUsuario";
import TelaPrincipalFiltro from "../pages/principal/TelaPrincipalFiltro";
import CategoriaList from "../pages/principal/CategoriaList";
import ItensAbaPrincipal from "../pages/principal/ItensAbaPrincipal";

const Stack = createNativeStackNavigator();

export const StackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="PedidosHistorico"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "green" },
      }}
    >
      <Stack.Screen
        name="Pedidos"
        component={PedidosHistorico}
        options={{ title: "Historico de Pedidos" }}
      />
      <Stack.Screen
        name="DadoPedido"
        component={DadoPedido}
        options={{ title: "Dados do Pedido" }}
      />
      <Stack.Screen
        name="BuscaPorProdutorItem"
        component={BuscaPorProdutorItem}
        options={{ title: "Busca Produtor/ Item" }}
      />
      <Stack.Screen
        name="BuscaGeral"
        component={BuscaGeral}
        options={{ title: "Busca Geral" }}
      />
      <Stack.Screen
        name="ListagemProdutorCategoria"
        component={ProdutorCategoriaList}
        options={{ title: "Listagem Produtor Categoria" }}
      />
      <Stack.Screen
        name="ListagemProdutorMaisPedidos"
        component={ProdutorMaisPedidosList}
        options={{ title: "Listagem Produtor mais pedidos" }}
      />
      <Stack.Screen
        name="BuscarPorItem"
        component={BuscarPorItem}
        options={{ title: "Buscar por item" }}
      />
      <Stack.Screen
        name="ProdutosProdutor"
        component={ProdutosProdutor}
        options={{ title: " Produtos do Produtor" }}
      />
      <Stack.Screen
        name="ProdutoDetalhe"
        component={ProdutoDetalhe}
        options={{ title: "produto" }}
      />
      <Stack.Screen
        name="VerSacola"
        component={VerSacola}
        options={{ title: "Ver Sacola" }}
      />
      <Stack.Screen
        name="SelecionarEntregaRetirada"
        component={SelecionarEntregaRetirada}
        options={{ title: "Selecionar Entrega" }}
      />
      <Stack.Screen
        name="SelecionarRetirada"
        component={SelecionarRetirada}
        options={{ title: "Selecionar Retirada" }}
      />
      <Stack.Screen
        name="TelaPrincipalFiltro"
        component={TelaPrincipalFiltro}
        options={{ title: "Tela Principal Filtro" }}
      />
      <Stack.Screen
        name="ConfirmarPedido"
        component={ConfirmarPedido}
        options={{ title: "Confirmar Pedido" }}
      />
      <Stack.Screen
        name="FinalizarPedido"
        component={FinalizarPedido}
        options={{ title: "Finalizar Pedido" }}
      />
      <Stack.Screen
        name="TelaPerfil"
        component={TelaPerfil}
        options={{ title: "Tela Perfil" }}
      />
      <Stack.Screen
        name="Comercio"
        component={ComercioList}
        options={{ title: "Comércio" }}
      />
      <Stack.Screen
        name="Usuario"
        component={Usuario}
        options={{ title: "Usuário" }}
      />
      <Stack.Screen
        name="Notificacoes"
        component={Notificacoes}
        options={{ title: "Notificações" }}
      />
      <Stack.Screen
        name="FavoritosList"
        component={FavoritosList}
        options={{ title: "Favoritos" }}
      />
      <Stack.Screen
        name="MapaProdutores"
        component={MapaProdutores}
        options={{ title: "Mapa" }}
      />
      <Stack.Screen
        name="AlteraPerfilUsuario"
        component={AlteraPerfilUsuario}
        options={{ title: "Alterar Dados do Usuário" }}
      />
      <Stack.Screen
        name="EnderecoListagem"
        component={EnderecoListagem}
        options={{ title: "Endereços" }}
      />
      <Stack.Screen
        name="EnderecoFormulario"
        component={EnderecoFormulario}
        options={{ title: "Formulário de Endereço" }}
      />
      <Stack.Screen
        name="PedidosHistorico"
        component={PedidosHistorico}
        options={{ title: "PedidosHistorico" }}
      />
      <Stack.Screen
        name="DadoPedido"
        component={DadoPedido}
        options={{ title: "Dados do Pedido" }}
      />
      <Stack.Screen
        name="AvaliacaoList"
        component={AvaliacaoList}
        options={{ title: "Listagem de avaliações" }}
      />
      <Stack.Screen
        name="ComercioList"
        component={ComercioList}
        options={{ title: "Listagem de Comércio" }}
      />
      <Stack.Screen
        name="UsuarioComercio"
        component={UsuarioComercio}
        options={{ title: "Usuário Comércio" }}
      />
      <Stack.Screen
        name="ComercioForm"
        component={ComercioForm}
        options={{ title: "Formulário do  Comércio" }}
      />
      <Stack.Screen
        name="ComercioEnderecoList"
        component={ComercioEnderecoList}
        options={{ title: "Endereços do Comércio" }}
      />
      <Stack.Screen
        name="ComercioEnderecoForm"
        component={ComercioEnderecoForm}
        options={{ title: "Formulário Endereço" }}
      />
      <Stack.Screen
        name="ProdutorListADM"
        component={ProdutorListADM}
        options={{ title: "Produtor List ADM" }}
      />
      <Stack.Screen
        name="ProdutoList"
        component={ProdutoList}
        options={{ title: "produto List" }}
      />
      <Stack.Screen
        name="Estoque"
        component={EstoqueList}
        options={{ title: "EstoqueList" }}
      />

      <Stack.Screen
        name="ProdutorForm"
        component={ProdutorForm}
        options={{ title: "Produtor Formulário" }}
      />
      <Stack.Screen
        name="ProdutorPerfil"
        component={ProdutorPerfil}
        options={{ title: "Produtor Perfil" }}
      />
      <Stack.Screen
        name="EnderecoForm"
        component={EnderecoForm}
        options={{ title: "Endereco Form" }}
      />
      <Stack.Screen
        name="EnderecoList"
        component={EnderecoList}
        options={{ title: "Endereco List" }}
      />
      <Stack.Screen
        name="ProdutosProdutor"
        component={ProdutosProdutor}
        options={{ title: "Produtos Produtor" }}
      />
      <Stack.Screen
        name="ProdutoForm"
        component={ProdutoForm}
        options={{ title: "produto Form" }}
      />
      <Stack.Screen
        name="EnderecosProdutor"
        component={EnderecosProdutor}
        options={{ title: "Enderecos Produtor" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Tela login" }}
      />
      <Stack.Screen
        name="TelaCadastroUsuario"
        component={TelaCadastroUsuario}
        options={{ title: "Tela Cadastro Usuario" }}
      />
      <Stack.Screen
        name="TelaPrincipalFiltro"
        component={TelaPrincipalFiltro}
        options={{ title: "Tela Principal Filtro" }}
      />
      <Stack.Screen
        name="CategoriaList"
        component={CategoriaList}
        options={{ title: "Categoria List" }}
      />
      <Stack.Screen
        name="ItensAbaPrincipal"
        component={ItensAbaPrincipal}
        options={{ title: "Itens Aba Principal" }}
      />
      <Stack.Screen
        name="ProdutorForm"
        component={ProdutorForm}
        options={{ title: "Produtor Formulário" }}
      />
      <Stack.Screen
        name="EnderecosUsuario"
        component={EnderecosUsuario}
        options={{ title: "Enderecos Usuario" }}
      />
    </Stack.Navigator>
  );
};
