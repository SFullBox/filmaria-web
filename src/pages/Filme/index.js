<<<<<<< HEAD
import { useState, useEffect} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import './filmes.css';

export default function filme(){
    // pegar o id do filme na url
    const {id} = useParams();

    // utilizaremos o useNavigate ( hook ) para navegação
    const navigate = useNavigate();

    const [filme, setFilmes] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function lerFilmes() {
            setLoading(true)
            try{
                const response = await api.get(`r-api/?api=filmes/${id}`)
                setFilmes(response.data)
            }catch(erro){
                console.error('Filme não encontrado, redirecionando para a HomePage',)
                navigate('/', { replace:true})
                return;

            } finally{
                setLoading(false)
            }
            
        }
        lerFilmes();
    },[id, navigate])

    function salvarFilmes(){
        if(!filme) return; // garantir que o filme não é nulo

        const minhaLista = localStorage.getItem('@primeflix')
        let filmesSalvos = JSON.parse(minhaLista) || []

        const temFilme = filmesSalvos.some((filmeSalvo) => filmesSalvos.id === filme.id)

        if(temFilme){
            toast.warn('Este filme já está na sua lista!')
            return;
        }
        filmesSalvos.push(filme)
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')
    }
    if(loading){
        return(
            <div className="loading-container">
                <h2>Carregando detalhes do filme</h2>
            </div>
        )
    }

}
return(
    <div className="container">

        <div className='filmes-info'>
            <article>
                <h1>{filme.nome}</h1>
                <img src={filme.foto}
                    alt={`Foto do filme ${filme.nome}`}
                    />
                <h3>Sinopse</h3>
                <p>{filme.sinopse}</p>
                <div>
                    <button onClick={salvarFilmes}>Salvar</button>
                    <a target='_blank'
                    rel="noopener noreferrer"
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.nome + 'trailer')}`}
                    className='botao-link'>
                        trailer
                    
                        
                    
                    </a>
                </div>

            </article>
        </div>
</div>

    
    
)
=======
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./filme.css";

export default function Filme() {
    
    // vamos pegar o id da url
    const { id } = useParams();

    // vamos usar o useNavigate (hook) para navegação
    const navigate = useNavigate();

    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);    

    // quando a pagina for carregada vamos buscar o filme na api
    useEffect(() => {
        async function lerFilme() {
            setLoading(true);
            try {
                const response = await api.get(`r-api/?api=filmes/${id}`);
                setFilme(response.data);
            } catch (error) {
                console.log('Deu erro a carregar o filme ', error);
                navigate("/", {replace: true});
                return;
            } finally {
                setLoading(false);              
                
            }
        }
        lerFilme();
    }, [id, navigate]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if (hasFilme) {
            toast.warn("Você já possui esse filme salvo!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando Filme...</h1>
            </div>
        )
    }
    
    // vamos exibit o detalhes
    return (
        <div className="container">
          <div className="filme-info">
            <article>
                <h1>{filme.nome}</h1>
                <img src={filme.foto} alt={filme.nome} />
                <h3>Sinopse</h3>
                <p>{filme.sinopse}</p>
                <div className="botoes">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="blank" rel="external" 
                        href={`https://youtube.com/results?search_query=${encodeURIComponent(filme.nome)}
                          +  ' trailer')}`}
                          className="botao-link"
                          >
                            Trailer
                        </a>
                    </button>
                </div>
            </article>
          </div>
        </div>
)}  
>>>>>>> 331786b (Commit alterações)
