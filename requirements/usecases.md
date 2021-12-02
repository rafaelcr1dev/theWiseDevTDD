# DeleteEvent UseCase

## Dados
* Id do Usuario
* Id da Pelada

## Fluxo primario
1. Obter os dados do grupo da pelada a ser removida
2. Verificar se o usuario que solicitou a exclusão da pelada tem permissão (admin aou dono)
3. Remover a pelada com o Id acima
4. Remover todas as partidas dessa Pelada

## Fluxo alternativo: Não foi encontrado um grupo para o id da Pelada informada
1. Retornar erro

## Fluxo alternativo: O usuario não pertence ao grupo
2. Retornar erro

## Fluxo alternativo: O usuario não tem permissão
2. Retornar erro