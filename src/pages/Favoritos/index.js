import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import './favoritos.css';

export default function Favoritos(){
    
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try{
            const minhaLista = localStorage.getItem('@primeflix');
            setFilmes(JSON.parse(minhaLista));
        } catch(error){
            console.log('Erro ao carregar o filmes salvos');
            toast.error('Erro ao carregar o filmes salvos');
            setFilmes([]);
        } finally{
            setLoading(false); 
        }
    }, []);
    
    function Deletar(id){
        const confirma = window.confirm('Tem certeza que deseja deletar este filme?');
        if(!confirma){
            return;
        }
        try{
            const filmeFiltrado = filmes.filter(item => item.id !== id);
            setFilmes(filmeFiltrado);
            localStorage.setItem('@primeflix', JSON.stringify(filmeFiltrado));
            toast.success('Filme deletado com sucesso!');
        } catch(error){
            console.log('Erro ao deletar um filme do LocalStorage');
            toast.error('Falha ao deletar o filme do LocalStorage');
        }
    }

    if(loading){
        return(
            <div className="loading-container">
                <h2>Carregando filmes...</h2>
            </div>
        );
    }

    return(
        <div className="filmes-container">
            <h2>Filmes Favoritos</h2>
            {filmes.length === 0 && (
                <span className="lista-vazia">Nenhum filme favoritado ainda.</span>
            )}
            <ul>
                {filmes.map(item => (
                    <li key={item.id}>
                        <span>{item.nome}</span>
                        <div className='acoes'>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={() => Deletar(item.id)}>Excluir</button>
                        </div>                   
                     </li>
                ))}
            </ul>
        </div>
    );
}