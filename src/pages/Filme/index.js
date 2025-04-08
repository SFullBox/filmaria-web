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