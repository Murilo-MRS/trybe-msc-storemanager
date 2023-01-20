#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido
## pela Trybe.

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path .vscode \
    --path trybe.yml \
    --path __tests__ \
    --path test/products.test.js \
    --path test/sales.test.js \
    --path test/bonus.test.js \
    --path test/02-list.test.js \
    --path test/03-validations.test.js \
    --path test/04-registerProduct.test.js \
    --path test/05-editProduct.test.js \
    --path test/06-deleteProduct.test.js \
    --path test/07-registerSales.test.js \
    --path test/08-updateSales.test.js \
    --path test/10-deleteSales.test.js \
    --path test/11-updateQuantity.test.js \
    --path test/12-validatesQuantity.test.js \
    --path test/unit-coverage.test.js \
    --path .env.example \
    --path public \
    --path README.md \
    --invert-paths --force --quiet

