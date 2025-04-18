import './App.css';
import DataTable from './components/DataTable';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/react-query';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DataTable />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
