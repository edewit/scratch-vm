const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const storeys = require('minecraft-storeys');

const log = require('../../util/log');

// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjg2LjgiIGhlaWdodD0iMzcxLjMzIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyODYuNzk5OTkgMzcxLjMzMzM0IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMyAwIDAgLTEuMzMzMyAwIDM3MS4zMykiPjxnIHRyYW5zZm9ybT0ic2NhbGUoLjEpIj48cGF0aCBkPSJtMjA4Ny4yIDIwMDAuMy0yMTguNjcgMTE2LjAydjI4Ny41N2MwIDYwLjc5LTQ5LjQ4IDExMC4yNS0xMTAuMjkgMTEwLjI1aC03NS41MnYxNjAuNTljMCA2MC43OS00OS40NiAxMTAuMjUtMTEwLjI2IDExMC4yNWgtODMwLjg2Yy0xOS4zNTUgMC0zNy41NzgtNy41NC01MS4yNDYtMjEuMjNsLTEwLjIyNi0xMC4yMWgtNTguOTI2bC05LjI5MyA5LjUzYy0xMy41ODIgMTMuOTItMzIuNDk2IDIxLjkxLTUxLjk1MyAyMS45MWgtNzkuMzU5Yy04MS41OTggMC0xNDcuOTgtNjYuNC0xNDcuOTgtMTQ4di00NzkuNGwtMjgyLjIzLTE2Mi43LTEuOTE0MS0xLjQyYy01MC43Ny0zNy4zNy00OC45NTMtODUuNTgtNDguMjAzLTEwNS43bDAuMTI1LTQuMzYgMC40ODA0Ny01MzEuMDkgMS4wNTg2LTY2Ni4wNWMwLjA2MjUtNTEuOTI5IDI5LjMzMi0xMDUuMDMgNzEuMTU2LTEyOS4xMmw5MzEuMzUtNTM2LjE4YzIzLjg4LTE0LjEyMSA0Ny4wOC0yMC45OCA3MC45NS0yMC45OCAyOC41NiAwIDUxLjM3IDEwLjE0OCA3MS4xMyAyMC42OTlsOTMxLjg2IDUzNi40NmM0MS44MyAyNC4wOSA3MS4wOSA3Ny4xOCA3MS4xNSAxMjkuMDhsMS4wNyA2NjYuMTQgMC40OCA1MzEuMDZjMC4wMSAyMy4xOSAwLjA4IDc3LjQ5LTYzLjg3IDExNi44OCIgZmlsbD0iIzI4MjgyOCIvPjxwYXRoIGQ9Im0yMDUwLjYgMTkzNy43LTEwMDMuMSA1NDAuNzFjLTQuMTkgMi4yNy05LjI3IDIuMjEtMTMuNDItMC4xN2wtOTQ0LjctNTQ0LjQ5Yy05LjI3MzUtNS4zMS0xNi41NTUtMjUuMzctMTYuNTI0LTUwLjI4bDAuNDcyNy01MzEuMDIgMjAzLjc1LTExNS4wNyAwLjQyMi0yMzAuNTEgMTczLjg5LTEwMC4xMS0wLjQ0MiAyNDIuNTQgMjE4LjYyLTEyNS44NSAwLjMyNC0yNjEuMzcgMTc1LjUzLTEwMS4wNS0wLjMyOCAyNjEuMzYgMjIyLjAxLTEyOS45Ni0wLjAxLTMuOTgxIDMuNDkgMS45NDkgNC4xMy0yLjQxOHY0LjczMWwyMzEuNTMgMTI5LjY4LTAuMzItMjYxLjM2IDE3NS41MiAxMDEuMDUgMC4zMyAyNjEuMzcgMjE4LjYxIDEyNS44NS0wLjQzLTI0Mi41NCAxNzMuODkgMTAwLjExIDAuNDIgMjMwLjUxIDIwMy43NSAxMTUuMDcgMC40NyA1MzEuMDJjMC4wNCAyNS4yNy00Ljk4IDM5Ljg3LTI3LjkgNTQuMjMiIGZpbGw9IiM1ZWJkMGMiLz48cGF0aCBkPSJtMTY4LjIyIDEzMzMuMi02NS4wMDggMzYuNzEtMC40NTcgNTA4LjIyIDY1LjQ2NS0zNy42OXYtNTA3LjI0bTE4MTUuMSAwLjA5djUwNy4yM2w2NS4zIDM3LjU3LTAuNDYtNTA4LjE4LTY0Ljg0LTM2LjYybS0xNzc5LjEgNTU1Ljc3LTY2LjU4MiAzOC4wNyAyNjcuMzkgMTU0LjExdi03Ni40bC0yMDAuODEtMTE1Ljc4bTE3NDcuMyAyLjU2LTE1MC4wNSA4MS4zNHY2NS4xbDIwOS4xMy0xMTIuNzMtNTkuMDgtMzMuNzFtLTEzMDEuMiAyNTQuNjV2MjQuOTNjMC03LjgyIDIuNDE0LTE1LjExIDYuNTM1LTIxLjE2bC02LjUzNS0zLjc3bTQwMi40NSAyOTUuMzdoLTIyLjQ0bDAuNjkgMC4zOWgyMS4wMmwwLjczLTAuMzkiIGZpbGw9IiM5NWUzMTMiLz48cGF0aCBkPSJtMTE0NCA4MzEuNDloLTE0My41OGw2Ni43My0zOS4wNTgtMC4wMS0zLjk4MSAzLjQ5IDEuOTQ5IDQuMTMtMi40MTh2NC43MzFsNjkuMjQgMzguNzc3IiBmaWxsPSIjNWViZDBjIi8+PHBhdGggZD0ibTI3Ny42NSAxMjQwLjUgMC40MTgtMjMwLjUyIDE3My44OS0xMDAuMTEtMC40MzcgMjQyLjU1IDIxOC42Mi0xMjUuODYgMC4zMjQtMjYxLjM1IDE3NS41Mi0xMDEuMDYtMC4zMjQgMjYxLjM3IDIyOS42Mi0xMzQuNDIgMC41NC02ODEuMjNjMC4wMi0yNS40OC0xNS42LTM3LjMyOC0zNC43My0yNi4zMmwtOTMxLjgzIDUzNi40N2MtMTkuMTI1IDExLjAwOC0zNC44MDUgNDAuODY3LTM0LjgzNiA2Ni4zNTlsLTAuNTE5NiA2NjkuMiAyMDMuNzUtMTE1LjA4IiBmaWxsPSIjYzk4NDJmIi8+PHBhdGggZD0ibTEwNDUuOCAxMTUuMjQtOTIxLjY5IDUzMC42NGMtNy45MDYgNC41Ny0xOS44NjMgMjMuMDUxLTE5Ljg4MyA0MC41NjJsLTAuOTc2IDYxNC44MSA1NC44NjctMzAuOTggMC44NzUtNTE2LjgxYzAuMDQ3LTMyLjA4MiA4LjkwNi02My42OTkgMzIuOTg4LTc3LjU2M2w3MzkuNDUtNDE0LjZjOC4wMDgtNC42MSAxNi44MTctNy4wMzEgMjUuMDE2LTcuMDMxIDE2LjQ2MSAwIDMwLjQ0MSA5Ljc2MSAzMC40MTQgMzEuMTc5bC0wLjg0OCA1MTkuODQgNTguODMtMzQuNDM3IDAuOTMtNTg4Ljg0IDAuMDItNjYuNzc0IiBmaWxsPSIjZThjYjRhIi8+PHBhdGggZD0ibTE4NzYuMSAxMjQwLjUtMC40Mi0yMzAuNTItMTczLjg4LTEwMC4xMSAwLjQ0IDI0Mi41NS0yMTguNjItMTI1Ljg2LTAuMzItMjYxLjM1LTE3NS41My0xMDEuMDYgMC4zMyAyNjEuMzctMjI5LjYyLTEzNC40Mi0yLjg3LTY4MS4yM2MtMC4wNC0yNS40OCAxNS41OS0zNy4zMjggMzQuNzEtMjYuMzJsOTMxLjg0IDUzNi40N2MxOS4xMyAxMS4wMDggMzQuOCA0MC44NjcgMzQuODMgNjYuMzU5bDIuODYgNjY5LjItMjAzLjc1LTExNS4wOCIgZmlsbD0iI2M5ODQyZiIvPjxwYXRoIGQ9Im0xMTA1LjYgMTE1LjMzLTAuMSA2Ni42NDEgMC45MyA1ODguODggNTMuOTEgMzEuNTU4IDIuNTMtNTE4Ljk0Yy0wLjAzLTIyLjE4IDE0LjcyLTMzLjAwOCAzMS43OC0zMy4wMDggNy42MiAwIDE1LjcxIDIuMTYgMjMuMTUgNi40MzdsNzM5LjQ1IDQyMS4wNmMyNC4wOSAxMy44NzEgMzMuMzggNDguOTYxIDMzLjQyIDgxLjAzOWwtMi41NSA1MDguNDIgNTkuOTIgMzMuODMtMC45OC02MTQuODVjLTAuMDItMTcuNDY4LTExLjk4LTM1Ljk0OS0xOS44Ny00MC41MTlsLTkyMS41OS01MzAuNTUiIGZpbGw9IiNlOGNiNGEiLz48cGF0aCBkPSJtODE1LjUyIDcxMi43Mi0wLjI1OCAyMDkuNjRjLTAuMDI0IDEwLjY5MiA1LjcyNiAyMC42MjkgMTQuOTg0IDI1Ljk0MiA0LjQ4OCAyLjU5NyA5LjYyNSAzLjk4IDE0Ljg0OCAzLjk4IDUuMjg1IDAgMTAuNTA4LTEuNDIyIDE1LjEwMS00LjA5bDE4NC45MS0xMDguMjUgMS44MyAxMDIuNjUgMC4xOSAyMjMuMDljMC4wMSAxNi40NiAxMy40MSAyOS44NiAyOS44NiAyOS44NiA3Ljk4IDAgMTUuNDktMy4xMyAyMS4xMy04Ljc3IDUuNjQtNS42NSA4Ljc1LTEzLjE1IDguNzQtMjEuMTNsLTAuMjktMzI1LjUzIDE4NC42MiAxMDguMDZjNC4xOSAyLjQ0OSA4LjgxIDMuNzUgMTMuODEgMy45NTdsMS4yOCAwLjE1MmMyLjEzIDAgNC4zMS0wLjMwMSA2Ljg0LTAuODcxIDMuMzItMC43ODkgNS43NS0xLjgwMSA4LTMuMDkgOS4yOS01LjMzMiAxNS4wNC0xNS4yNjkgMTUuMDItMjUuOTYxbC0wLjI2LTIwOS42NCAxMTUuNzYgNjYuNjUyIDAuMzEgMjQ0LjEzYzAuMDEgMTAuNjQgNS43NSAyMC41MyAxNC45NiAyNS44M2wyMTguNiAxMjUuODZjNC41MSAyLjYgOS42NyAzLjk5IDE0LjkgMy45OSA1LjI0IDAgMTAuNDItMS4zOSAxNC45Ny00LjAxIDkuMjEtNS4zNCAxNC45MS0xNS4yNiAxNC44OS0yNS45MmwtMC4zMy0xOTAuNzggMTE0LjEgNjUuNjkxIDAuMzggMjEzLjI5IDAuMjMgMi4xNGMwLjA4IDEuNTggMC4zIDMuNjcgMC44MyA1LjY0IDIuMTEgNy42OSA3LjI1IDE0LjI3IDE0LjEyIDE4LjE3bDE4OC41OSAxMDYuNTEgMC40NiA1MDguMTgtMTAyLjYzLTU5LjA2Yy0xLjQtMC44MS0yLjg4LTEuMzctNC4zOC0xLjg5bC0yMy4wOS0xMy4yM2MtNC41Ni0yLjU4LTkuNjgtMy45Ni0xNC44Mi0zLjk2LTE2LjUgMC0yOS45MyAxMy40Mi0yOS45MyAyOS45NCAwIDEwLjcyIDUuNzggMjAuNjggMTUuMSAyNS45N2wxMjEuNzYgNjkuNDctOTY5LjQyIDUyMi41Ni05MDMuNTQtNTIwLjc2IDE4MS44Mi0xMDMuOTVjOC43NzctNS4wNCAxNC4yMjYtMTQuNDMgMTQuMjI2LTI0LjU0di0zLjcxYzAtNy43OS0zLjA2Mi0xNS4wMi04LjYzMi0yMC4zNS01LjI1NC01LjA0LTEyLjQxOC03LjkzLTE5LjY0NS03LjkzLTQuODc5IDAtOS43MTUgMS4yOC0xNC4wMTkgMy43N2wtNy40MDcgNC4yMmMtMS4wODIgMC4yMS0yLjQ2OCAwLjU2LTMuOTI1IDEuMzhsLTE3Ny4zNSAxMDIuMTEgMC40NTctNTA4LjIyIDE4OC41OC0xMDYuNTFjNi44ODctMy45IDEyLjAzMS0xMC41IDE0LjEzNy0xOC4xMiAwLjY5OS0yLjU4IDEuMDUxLTUuMjEgMS4wNTEtNy44NmwwLjM4Ni0yMTMuMjYgMTE0LjA5LTY1LjY5MS0wLjM0IDE5MC43OGMtMC4wMTkgMTAuNjYgNS42ODggMjAuNTggMTQuODk1IDI1LjkyIDQuNTE5IDIuNjIgOS42OTUgNC4wMSAxNC45MzMgNC4wMSA1LjIxOSAwIDEwLjM4Ny0xLjM5IDE0LjkyNi0zLjk5bDIxOC42Mi0xMjUuODZjNi42MTctMy44MSAxMS40NjktMTAgMTMuNjY4LTE3LjQyIDAuODU2LTIuODEgMS4yODktNS42NiAxLjI4OS04LjQzbDAuMzEzLTI0NC4xMSAxMTUuNzUtNjYuNjUybTI5MC4wMy01MzAuNzUgMC4xLTY2LjY0MSA5MjEuNTkgNTMwLjU1YzcuODkgNC41NyAxOS44NSAyMy4wNTEgMTkuODcgNDAuNTE5bDAuOTggNjE0Ljg1LTE0My45OS04MS4zLTAuMzgtMjEzLjEzYy0wLjAxLTEwLjYyOS01Ljc1LTIwLjUxOS0xNC45Ny0yNS44MDhsLTE3My44Ny0xMDAuMTJjLTQuNTQtMi42MDItOS42OS0zLjk4MS0xNC45MS0zLjk4MS01LjI0IDAtMTAuNDIgMS4zNzktMTQuOTYgNC05LjIxIDUuMzQtMTQuOTEgMTUuMjUtMTQuODkgMjUuOTE4bDAuMzMgMTkwLjc4LTE1OC44LTkxLjQyLTAuMzEtMjQ0LjE0YzAtMi42NTMtMC4zNC01LjI4MS0xLjA1LTcuODEzLTIuMDgtNy42NTYtNy4wMy0xNC4wNjYtMTMuOTQtMTguMDM5bC0xNzUuNS0xMDEuMDRjLTQuNTQtMi42MDktOS42OC00LjAxMi0xNC45LTQuMDEyLTIuNjEgMC01LjIgMC4zMzItNy42OSAxLjAxMi0yLjUyIDAuNjgtNC45NyAxLjY5Mi03LjI2IDMuMDItOS4yMSA1LjMzMi0xNC45NCAxNS4yNDItMTQuOTIgMjUuODc5bDAuMjcgMjA5LjIzLTE2OS44Ny05OS40MzctMC45My01ODguODhtLTEwMDEuMyA1MDQuNDdjMC4wMi0xNy41MTEgMTEuOTc3LTM1Ljk5MiAxOS44ODMtNDAuNTYybDkyMS42OS01MzAuNjQtMC4wMiA2Ni43NzQtMC45MyA1ODguODQtMTY5Ljg2IDk5LjQzNyAwLjI2Ni0yMDkuMjNjMC4wMTUtMTAuNjM3LTUuNy0yMC41NDctMTQuOTEtMjUuODc5LTIuMjctMS4zMDktNC43MTUtMi4zNC03LjI0Ny0zLjAyLTIuNS0wLjY4LTUuMDgyLTEuMDEyLTcuNzA3LTEuMDEyLTUuMjIyIDAtMTAuMzYzIDEuNDAzLTE0LjkwNiA0LjAxMmwtMTc1LjUyIDEwMS4wNmMtOS4yMTEgNS4yOTMtMTQuOTQ5IDE1LjE5MS0xNC45NTcgMjUuODMybC0wLjMxMyAyNDQuMTQtMTU4LjgxIDkxLjQyIDAuMzQtMTkwLjc4YzAuMDIzLTEwLjY2OC01LjY4NC0yMC41NzgtMTQuODkxLTI1LjkxOC00LjU1NS0yLjYyMS05LjcxOS00LTE0Ljk2OS00LTUuMjE5IDAtMTAuMzcxIDEuMzc5LTE0Ljg5IDMuOTgxbC0xNzMuODkgMTAwLjEyYy05LjIxMSA1LjI4OS0xNC45NDkgMTUuMTc5LTE0Ljk1NyAyNS44MDhsLTAuMzg3IDIxMy4xMy0xNDMuOTggODEuMyAwLjk3Ni02MTQuODFtOTcxLjA4LTY0My43OGMtMTYuMDEgMC0zMi4xMiA0LjkxMDEtNDkuMjUgMTUuMDM5bC05MzEuNzYgNTM2LjQ0Yy0yOC4zNDQgMTYuMzA4LTQ5Ljc0MiA1NS45NDktNDkuNzg1IDkyLjE5OWwtMS4wNjI1IDY2Ni4wNy0wLjQ4MDUgNTMxLjA1LTAuMTQ0NSA1LjQ2Yy0wLjY0ODQgMTcuMjktMS43MTg3IDQ2LjI0IDMwLjg0IDcwLjIybDk0NS40NyA1NDQuOTljNi43IDMuODMgMTQuMjQgNS44NSAyMS44MiA1Ljg1IDcuMiAwIDE0LjM5LTEuODQgMjAuNzctNS4zMWwxMDAzLTU0MC42OGM0My42Ny0yNi44OSA0My42MS01OS4xOCA0My41OC04MC41NWwtMC40OC01MzEuMDEtMS4wNi02NjYuMTFjLTAuMDQtMzYuMjMtMjEuNDUtNzUuODcxLTQ5Ljc4LTkyLjE3OWwtOTMxLjg1LTUzNi40NmMtMTQuNy03Ljg1OTQtMzAuNzMtMTUuMDItNDkuODQtMTUuMDIiIGZpbGw9IiMyODI4MjgiLz48cGF0aCBkPSJtMTAzNy40IDI0NTkuNiAwLjAzLTAuMDEtMC4wMyAwLjAxIiBmaWxsPSIjMzMzIi8+PHBhdGggZD0ibTE3NjcgMTgyNS4zaC03NDIuNGwtMzEuNDQ1LTMxLjQ0aC0xMTkuNDlsLTMwLjY4NCAzMS40NGgtMTU0Ljg1Yy0yMC43NTggMC0zNy43MzUtMTYuOTctMzcuNzM1LTM3Ljczdi0yMzIuN2MwLTIwLjc2IDE2Ljk3Ny0zNy43NCAzNy43MzUtMzcuNzRoMTU0LjA5bDMxLjQ0NS0zMi4yM2gxMTkuNDlsMzIuMjM1IDMyLjIzaDc0MS42MWMyMC43NSAwIDM3Ljc0IDE2Ljk4IDM3Ljc0IDM3Ljc0djIzMi43YzAgMjAuNzYtMTYuOTkgMzcuNzMtMzcuNzQgMzcuNzMiIGZpbGw9IiM0ZjZmZDIiLz48cGF0aCBkPSJtMTc1OC4yIDI0NDEuNmgtNzMzLjY1bC0zMS40NDUtMzEuNDVoLTExOS40OWwtMzAuNjg0IDMxLjQ1aC0xNTQuODVjLTIwLjc1OCAwLTM3LjczNS0xNi45OS0zNy43MzUtMzcuNzR2LTIzMi43YzAtMjAuNzUgMTYuOTc3LTM3LjczIDM3LjczNS0zNy43M2gxNTQuMDlsMzEuNDQ1LTMyLjI0aDExOS40OWwzMi4yMzUgMzIuMjRoNzMyLjg2YzIwLjc1IDAgMzcuNzQgMTYuOTggMzcuNzQgMzcuNzN2MjMyLjdjMCAyMC43NS0xNi45OSAzNy43NC0zNy43NCAzNy43NCIgZmlsbD0iI2Q2NDhkZiIvPjxwYXRoIGQ9Im02ODcuNDkgMjEzMy41aC0yMS43NThsMC4wNzkgNy4zNGM2LjI1Ny00LjYxIDEzLjk2OC03LjMzIDIyLjI4OS03LjMzaDE3Ljc2NXYtMC4wMWwtMTcuNzY1IDAuMDFjLTAuMjA0IDAtMC40MDctMC4wMS0wLjYxLTAuMDEiIGZpbGw9IiM5NWUzMTMiLz48cGF0aCBkPSJtNzA1Ljg3IDIxMzMuNWgtMTcuNzY1Yy04LjMyMSAwLTE2LjAzMiAyLjcyLTIyLjI4OSA3LjMzbDIuNTE1IDIyNi41N2MwIDMyLjU2LTAuMTk5IDQ5LjEzIDMyLjA2NyA0OS4xM2wxNTEuMjUtNC42N2M1LjY5OSAwIDExLjE0OC0yLjMxIDE1LjEyOS02LjQ0bDI0LjE2NC0yNWgxMDAuNzNsMjQuOTcgMjUuMTljMy45NiA0IDkuMzQgNi4yNSAxNC45NCA2LjI1bDcyMC4yNy0wLjA3YzUuNDEgMCAxMC41NC0wLjk4IDE1LjUxLTIuMzh2LTUyLjExYy0yLjI4IDguNTItMTAuMDggMTguMzctMTcuNjMgMTguMzdsLTY5NC43MSAwLjA3LTM3LjAzLTMyLjE3Yy0zLjk2LTQtOS4zNC02LjI1LTE0Ljk0LTYuMjVoLTE0NS40OGMtNS43IDAtMTEuMTQxIDIuMzEtMTUuMTI1IDYuNDRsLTI5Ljc4MiAyOS41NWgtOTAuNTMxYy04Ljk1NyAwLTE2LjI1LTcuMzUtMTYuMjUtMTYuMzlsLThlLTMgLTIyMy40MyIgZmlsbD0iI2VlNzJmMiIvPjxwYXRoIGQ9Im0xNjMyLjkgMjI0Ny4yaC0zNzYuNzVjLTExLjc0IDAtMjEuMzMgOS42LTIxLjMzIDIxLjMzdjI0LjU0YzAgMTEuNzMgOS41OSAyMS4zMiAyMS4zMyAyMS4zMmgzNzYuNzVjMTEuNzMgMCAyMS4zMy05LjU5IDIxLjMzLTIxLjMydi0yNC41NGMwLTExLjczLTkuNi0yMS4zMy0yMS4zMy0yMS4zMyIgZmlsbD0iI2Y4ZjhmOCIvPjxwYXRoIGQ9Im0xNjQ0LjIgMTYzNC42aC00MDYuNjVjLTUuNTEgMC0xMCA0LjUtMTAgMTB2NDcuMmMwIDUuNSA0LjQ5IDEwIDEwIDEwaDQwNi42NWM1LjUgMCAxMC00LjUgMTAtMTB2LTQ3LjJjMC01LjUtNC41LTEwLTEwLTEwIiBmaWxsPSIjZjhmOGY4Ii8+PHBhdGggZD0ibTE3NjMuOCAyMTMzLjVoLTczOS4yMmwtMzEuNDQ1LTMxLjQ1aC0xMTkuNDlsLTMwLjY4NCAzMS40NWgtMTU0Ljg1Yy0yMC43NTggMC0zNy43MzUtMTYuOTktMzcuNzM1LTM3Ljc0di0yMzIuN2MwLTIwLjc2IDE2Ljk3Ny0zNy43NCAzNy43MzUtMzcuNzRoMTU0LjA5bDMxLjQ0NS0zMi4yM2gxMTkuNDlsMzIuMjM1IDMyLjIzaDczOC40M2MyMC43NiAwIDM3LjczIDE2Ljk4IDM3LjczIDM3Ljc0djIzMi43YzAgMjAuNzUtMTYuOTcgMzcuNzQtMzcuNzMgMzcuNzQiIGZpbGw9IiMyYmE3ZTYiLz48cGF0aCBkPSJtODQyLjE5IDI0NDIgMzEuNDQ1LTMyLjIzaDExOS40OWwzMi4yMzUgMzIuMjNoNTQ3LjA2YzIwLjc1IDAgMzcuNzQgMTYuOTkgMzcuNzQgMzcuNzR2MTk0Ljk2YzAgMjAuNzYtMTYuOTkgMzcuNzMtMzcuNzQgMzcuNzNoLTgzMC44NmwtMzEuNDQ2LTMxLjQ0aC0xMTkuNWwtMzAuNjc1IDMxLjQ0aC03OS4zNzljLTQxLjUxMiAwLTc1LjQ3Ny0zMy45NS03NS40NzctNzUuNDZ2LTEyOTUuOWMwLTQxLjUxIDMzLjk2NS03NS40OCA3NS40NzctNzUuNDhsMTA5MS45IDEuMTljMjAuNzUgMCAzNy43NCAxNi45OCAzNy43NCAzNy43M3YxNzMuNjRjMCAyMC43NS0xNi45OSAzNy43My0zNy43NCAzNy43M2gtNTQ3Ljg1bC0zMS40NDUtMzEuNDRoLTExOS40OWwtMzAuNjg0IDMxLjQ0aC0xOTIuNTh2OTI2LjA5aDE5MS44MiIgZmlsbD0iI2UwYTgxNSIvPjxwYXRoIGQ9Im0xNTc2IDE5MjkuOWgtMTU3LjgxYy0zNi4xOSAwLTU4LjQ1IDE2LjM5LTU4LjQ1IDM2LjQ0djMuODljMCAyMC4wNCAyMi4yNiAzNi40NSA1OC40NSAzNi40NWgxNTcuODFjMzYuMTkgMCA1OC41Mi0xNi40MSA1OC41Mi0zNi40NXYtMy44OWMwLTIwLjA1LTIyLjMzLTM2LjQ0LTU4LjUyLTM2LjQ0IiBmaWxsPSIjZjhmOGY4Ii8+PHBhdGggZD0ibTE2MTAuMiAxNDMzLjd2NDQuNDdjMCAxMC4xOS00LjEgMTkuNDgtMTAuNzMgMjYuMjggMTguOTYtMTAuMzMgMzIuNjctMzAuMDQgMzMuMDYtNTEuOTFsLTIyLjMzLTE4Ljg0bS02MTcuMDQgNTAuNzZoLTEwLjYwNWwwLjM5OCAwLjM5aDEwLjIwN2wyNy4yMDUgMjcuMjFoMC40bC0yNy42MDUtMjcuNiIgZmlsbD0iIzk1ZTMxMyIvPjxwYXRoIGQ9Im05OTMuMTIgMTQ4NC45aC0xMC4yMDdsMjEuMDgyIDIwLjk2YzQuMDMgNCA5LjQ4IDYuMjUgMTUuMTcgNi4yNWgxLjE2bC0yNy4yMDUtMjcuMjEiIGZpbGw9IiM3ZGFmZWMiLz48cGF0aCBkPSJtOTk4LjY2IDE0MDUuMWgtMTM2LjY2Yy01Ljc4MSAwLTExLjMyNCAyLjMyLTE1LjM1NSA2LjQ0bC0yNC41MzYgMjUuMDJoLTE3OS4zNmMtMTEuODQ4IDAtMjEuNDU3IDkuNTQtMjEuNDU3IDIxLjMzdjU0Ljg3aDQyLjkxNHYtMC42M2gxNzIuMjdjNS43ODIgMCAxMS4zMjEtMi4zMSAxNS4zNTYtNi40NGwyNC41MzUtMjUuMDFoMTAyLjI4bDMuODcyIDMuODVoMTAuNjA1bDI3LjYwNSAyNy42aDU0OS41M2MxMC4zMiAwIDIwLjMyLTIuNzggMjkuMTctNy42MSA2LjYzLTYuOCAxMC43My0xNi4wOSAxMC43My0yNi4yOHYtNDQuNDdsLTEzLjg4LTExLjcxcy0xLjM1IDEzLjMzLTE1LjA1IDE0LjVoLTU0Mi4wNWwtMjUuMzUtMjUuMjFjLTQuMDItNC05LjQ4LTYuMjUtMTUuMTctNi4yNSIgZmlsbD0iI2YyZGEyMSIvPjxwYXRoIGQ9Im00NzIuMzMgMTI2Ni4xaC0zMC42NjRjLTIuNDc2IDQuNzItNC42MjkgOS42NC02LjM4MyAxNC43NCAxMC41NjctNy45NiAyMy4yNjItMTMuMjIgMzcuMDQ3LTE0Ljc0IiBmaWxsPSIjOTVlMzEzIi8+PHBhdGggZD0ibTU5Mi45NSAyNjgxaC0yLjMzNmwtOC41MDggOC43MmMyLjczMS0xLjA4IDUuMjMxLTIuNzYgNy4zMTMtNC45OGwzLjUzMS0zLjc0IiBmaWxsPSIjM2YzZjNmIi8+PHBhdGggZD0ibTQ3OS4xNiAxMjY2LjFoLTYuODM2Yy0xMy43ODUgMS41Mi0yNi40OCA2Ljc4LTM3LjA0NyAxNC43NC0zLjMwMSA5LjYyLTUuMTg3IDE5LjktNS4xODcgMzAuNjl2MTI4My43Yy05LjY2IDk1LjkgNDEuNTcgOTUuOSA5Mi42NzYgOTUuOWg1Mi4wMzFjMi41MjMgMCA0Ljk5Ni0wLjQ4IDcuMzA0LTEuNGw4LjUwOC04LjcyaDIuMzM2bDE5LjgzMi0yMS4wMmg5Ny4zNDRsMjQuMTMzIDI0Ljk1YzMuODI4IDMuOTYgOS4wMjMgNi4xOSAxNC40MzcgNi4xOWw4MDQuOTItMS4zOGMzMS4xOCAwIDU2LjU1LTI2LjI1IDU2LjU1LTU4LjUxdi0xMi44bC0yOS44NyAwLjY5Yy0xLjczIDcuMDItNy42MSAxMi4zNC0xNC45NCAxMi4zNGwtNzgzLjI0IDAuNjktMjQuMTI5LTI0Ljk0Yy0zLjgyOC0zLjk3LTkuMDIzLTYuMTktMTQuNDQxLTYuMTloLTE2NC4wOWMtNS41MDQgMC0xMC43NjUgMi4yOC0xNC42MjEgNi4zN2wtMjMuMzYzIDI0Ljc2LTMwLjIxMS0wLjA2Yy0yOC41NzggMC00MS4wMDQtMTQuMzUtNDEuMDA0LTQzLjkybDAuNjg4LTEyOTMuM2MwLTEwLjYyIDMuMDc4LTIwLjQ3IDguMjI2LTI4LjgxIiBmaWxsPSIjZjJkYTIxIi8+PHBhdGggZD0ibTY3Ny42IDE4MjYuOGgtMTEuMDM5bDAuMDU5IDUuMjZjMy4zMTYtMi4zMiA3LjAxNi00LjExIDEwLjk4LTUuMjYiIGZpbGw9IiM5NWUzMTMiLz48cGF0aCBkPSJtNzA2LjgzIDE4MjYuOGgtMjkuMjI3Yy0zLjk2NCAxLjE1LTcuNjY0IDIuOTQtMTAuOTggNS4yNmwyLjU1MSAyMjguNjRjMCAzMi41Ni0wLjIwNyA0OS4xMyAzMi4xNjQgNDkuMTNsMTUxLjcyLTQuNjZjNS43MSAwIDExLjE3OS0yLjMyIDE1LjE3NS02LjQ1bDI0LjI0Mi0yNC45OWgxMDEuMDRsMjUuMDUgMjUuMTljMy45NyA0IDkuMzYgNi4yNSAxNC45OCA2LjI1bDcyMi41NC0wLjA3YzUuNDMgMCAxMC41OC0wLjk5IDE1LjU4LTIuMzh2LTUyLjExYy0yLjMgOC41Mi0xMC4xMyAxOC4zNy0xNy43MSAxOC4zN2wtNjk2Ljg5IDAuMDYtMzcuMTQtMzIuMTdjLTMuOTgtNC05LjM3LTYuMjUtMTQuOTktNi4yNWgtMTQ1Ljk0Yy01LjcxNSAwLTExLjE4IDIuMzItMTUuMTcyIDYuNDRsLTI5Ljg3NSAyOS41NS05MC44MTIgMC4wMWMtOC45ODUgMC0xNi4zMDUtNy4zNi0xNi4zMDUtMTYuNGwtNGUtMyAtMjIzLjQyIiBmaWxsPSIjNDRkYWY1Ii8+PHBhdGggZD0ibTcxMC44OCAxNTI2LjZoLTQwLjI2NmwyLjYxIDIzMy45MWMwIDMyLjU1LTAuMjA3IDQ5LjEzIDMyLjE2NCA0OS4xM2wxNTEuNzItNC42N2MxLjkxMSAwIDMuNzktMC4yNiA1LjU5OC0wLjc1bDEwLjkzLTExLjIxaDQuMDA0bDE4Ljg4Ni0xOS40N2gxMDEuMDRsMjUuMDQ3IDI1LjE4YzMuOTggNCA5LjM3IDYuMjUgMTQuOTkgNi4yNWw3MjIuNTQtMC4wNmM1LjQzIDAgMTAuNTgtMC45OSAxNS41Ny0yLjM4bC0wLjg2LTU5Ljg3Yy0yLjI5IDguNTEtMTAuMTIgMTguMzYtMTcuNjkgMTguMzZsLTY5Ni45IDAuMDctMzcuMTUtMzIuMThjLTMuOTctMy45OS05LjM3LTYuMjQtMTQuOTktNi4yNGgtMTQ1LjkzYy01LjcxNSAwLTExLjE3NiAyLjMxLTE1LjE3MiA2LjQzbC0yOS44NzEgMjkuNTZoLTkwLjgyMWMtOC45ODQgMC0xNi4zMDEtNy4zNS0xNi4zMDEtMTYuNGwwLjg1Mi0yMTUuNjYiIGZpbGw9IiM3ZGFmZWMiLz48cGF0aCBkPSJtODc3LjY0IDE3OTMuMWgtNC4wMDRsLTEwLjkzIDExLjIxYzMuNjA2LTEgNi45MTgtMi45NCA5LjU3OC01LjY4bDUuMzU2LTUuNTMiIGZpbGw9IiM0NGRhZjUiLz48cGF0aCBkPSJtOTgwLjc2IDIxMzEuOSAyMi43MDIgMjIuNjljNS41NiA1LjU2IDEzLjI1IDguNzUgMjEuMTEgOC43NWg3MzMuNjVjNC4zNCAwIDcuODggMy41MiA3Ljg4IDcuODd2MjMyLjdjMCA0LjMzLTMuNTQgNy44NS03Ljg4IDcuODVoLTcyMC44OWwtMjMuMS0yMy4wOGMtNS42NC01LjYyLTEzLjE0LTguNzQtMjEuMTE3LTguNzRoLTExOS40OGMtNy45OTYgMC0xNS44MDEgMy4yOS0yMS4zODMgOS4wMmwtMjIuMjU0IDIyLjhoLTE0MS45Yy00LjMzMiAwLTcuODY0LTMuNTItNy44NjQtNy44NXYtMjMyLjdjMC00LjM1IDMuNTMyLTcuODcgNy44NjQtNy44N2gxNTQuMDhjOC43NzMgMCAxNi41Ny0zLjI5IDIyLjE1Mi05LjAybDIxLjg3NS0yMi40MnptMC0zMDguMTggMjIuNzAyIDIyLjcxYzUuNTYgNS41NiAxMy4yNSA4Ljc1IDIxLjExIDguNzVoNzM5LjIzYzQuMzMgMCA3Ljg3IDMuNTIgNy44NyA3Ljg1djIzMi43MmMwIDQuMzMtMy41NCA3Ljg1LTcuODcgNy44NWgtNzI2LjA4bC0yMy40OS0yMy40OGMtNS42NC01LjYyLTEzLjE0LTguNzUtMjEuMTE3LTguNzVoLTExOS40OGMtNy45OTYgMC0xNS44MDEgMy4yOS0yMS4zODMgOS4wMmwtMjIuNjQxIDIzLjIxaC0xNDEuNTFjLTQuMzMyIDAtNy44NjQtMy41Mi03Ljg2NC03Ljg1di0yMzIuNzJjMC00LjMzIDMuNTMyLTcuODUgNy44NjQtNy44NWgxNTQuMDhjOC44IDAgMTYuNjA1LTMuMjkgMjIuMTY4LTkuMDVsMjEuODU5LTIyLjQxem0wLTMwOC45NiAyMy40OTIgMjMuNWM1LjY0IDUuNjIgMTMuMTMgOC43NSAyMS4xMSA4Ljc1aDc0MS42MWM0LjM0IDAgNy44OCAzLjUyIDcuODggNy44NXYyMzIuN2MwIDQuMzUtMy41NCA3Ljg3LTcuODggNy44N2gtNzI5LjI1bC0yMy40OS0yMy40N2MtNS42NC01LjYzLTEzLjE0LTguNzUtMjEuMTE3LTguNzVoLTExOS40OGMtNy45OTYgMC0xNS44MDEgMy4yOS0yMS4zODMgOS4wMmwtMjIuNjQxIDIzLjJoLTE0MS41MWMtNC4zMzIgMC03Ljg2NC0zLjUyLTcuODY0LTcuODd2LTIzMi43YzAtNC4zMyAzLjUzMi03Ljg1IDcuODY0LTcuODVoMTU0LjA4YzguMDMxIDAgMTUuODMyLTMuMjkgMjEuMzk0LTkuMDRsMjIuNjMzLTIzLjIxem0tNTAwLjIgMTE2Ny44Yy0yNS4xNDEgMC00NS42MDYtMjAuNDYtNDUuNjA2LTQ1LjZ2LTEyOTUuOGMwLTI1LjE4IDIwLjQ2NS00NS42NyA0NS42MDYtNDUuNjdsMTA5MS44IDEuMTZjNC4yMSAwIDcuODkgMy42NiA3Ljg5IDcuODd2MTczLjY1YzAgNC4zMy0zLjUyIDcuODUtNy44NiA3Ljg1aC01MzUuNWwtMjIuNy0yMi43MWMtNS42NC01LjYyLTEzLjE0LTguNzUtMjEuMTE3LTguNzVoLTExOS40OGMtOC4wMjggMC0xNS44MjggMy4zLTIxLjM5MSA5LjA1bC0yMS44NTkgMjIuNDFoLTE4MC4wMWMtMTYuNDY1IDAtMjkuODU5IDEzLjQxLTI5Ljg1OSAyOS44N3Y5MjYuMDhjMCAxNi40NSAxMy4zOTQgMjkuODcgMjkuODU5IDI5Ljg3aDE5MS44MWM0LjExMyAwIDguMjU4LTAuOTQgMTIuMzI0LTIuNzkgMy42MjEtMS40OCA3LjAyNy0zLjc1IDkuODE2LTYuNjNsMjEuODg3LTIyLjQxaDk0LjU1MWwyMi43MDIgMjIuNjljMi44MyAyLjgxIDYuMjIgNS4wMiAxMC4wNyA2LjU2IDMuNjYgMS42NCA3Ljc2IDIuNTggMTEuODMgMi41OGg1NDcuMDdjNC4xOSAwIDcuODYgMy42NyA3Ljg2IDcuODd2MTk0Ljk4YzAgNC4zMy0zLjUyIDcuODUtNy44NiA3Ljg1aC04MTguNWwtMjIuNzAzLTIyLjY4Yy01LjU2My01LjU2LTEzLjI1LTguNzUtMjEuMTEtOC43NWgtMTE5LjUxYy03Ljk5NiAwLTE1LjggMy4yOS0yMS4zODIgOS4wMmwtMjEuODY4IDIyLjQxem0wLjAyMy0xNDQ2LjhjLTU4LjA5OCAwLTEwNS4zNSA0Ny4yNy0xMDUuMzUgMTA1LjM0djEyOTUuOWMwIDU4LjA4IDQ3LjI1NCAxMDUuMzQgMTA1LjMzIDEwNS4zNGg3OS4zNjNjOCAwIDE1LjgwMS0zLjI5IDIxLjM4My05LjAybDIxLjg5NC0yMi40MWg5NC41NTFsMjIuNzA3IDIyLjY4YzUuNjMzIDUuNjMgMTMuMTI5IDguNzUgMjEuMTA1IDguNzVoODMwLjg2YzM3LjI3IDAgNjcuNTktMzAuMzMgNjcuNTktNjcuNTl2LTE5NC45OGMwLTIuNzItMC4yLTUuNDUtMC42LTguMjdoMTE4LjhjMzcuMjggMCA2Ny42MS0zMC4zMiA2Ny42MS02Ny41OXYtMjMyLjdjMC0xMS44MS0zLjEzLTIzLjMtOS4xLTMzLjU3IDkuNS0xMS45NCAxNC42Ni0yNi41OSAxNC42Ni00MS44OXYtMjMyLjcyYzAtMTIuNTQtMy41Mi0yNC42NS0xMC4yNS0zNS4zNyA4LjctMTEuNjcgMTMuNDMtMjUuNjcgMTMuNDMtNDAuMXYtMjMyLjdjMC0zNy4yNi0zMC4zMi02Ny41OS02Ny42LTY3LjU5aC0xMjcuNjdjMC40OC0zLjA5IDAuNzItNi4wOSAwLjcyLTkuMDR2LTE3My42NWMwLTM3LjI5LTMwLjMyLTY3LjYxLTY3LjU5LTY3LjYxbC0xMDkxLjgtMS4xNyIgZmlsbD0iIzI4MjgyOCIvPjwvZz48L2c+PC9zdmc+Cg==';

class Minecraft {
    constructor () {
        this.eventsReceived = [];
        this.registeredConditions = new Set();
        this.playerLastJoined = null;
        this.effectedPlayer = null;

        const urlParams = global.settings || new URL(window.location.href).searchParams;

        this._onConnect = new storeys.MinecraftProvider(urlParams.get('eventBusURL'), urlParams.get('code')).connect();
        this._onConnect.then(minecraft => {
            this.minecraft = minecraft;
            this.effectedPlayer = minecraft.loggedInPlayer || global.settings.get('user');
            this.minecraft.whenPlayerJoins(this.effectedPlayer).subscribe(result => {
                this.playerLastJoined = result.player;
                this.eventsReceived['Player joins'] = true;
            });
        });

        this._onConnect.then.bind(this);
    }

    /**
     * @return {object} This extension's metadata.
     */
    getInfo () {
        return {
            id: 'minecraft',
            name: 'Minecraft',
            menuIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'whenEvent',
                    blockType: BlockType.HAT,
                    text: 'when [EVENT]',
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'events',
                            defaultValue: 'playerJoined'
                        }
                    }
                },
                {
                    opcode: 'whenEntity',
                    blockType: BlockType.HAT,
                    text: 'when [ENTITY] right clicked',
                    arguments: {
                        ENTITY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Entity'
                        }
                    }
                },
                {
                    opcode: 'whenCommand',
                    blockType: BlockType.HAT,
                    text: 'when /[COMMAND]',
                    arguments: {
                        COMMAND: {
                            type: ArgumentType.STRING,
                            defaultValue: 'demo'
                        }
                    }
                },
                {
                    opcode: 'whenInside',
                    blockType: BlockType.HAT,
                    text: 'when inside [NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING, defaultValue: 'name'
                        }
                    }
                },
                {
                    opcode: 'narrate',
                    blockType: BlockType.COMMAND,
                    text: '[ENTITY] speaks [TEXT]',
                    arguments: {
                        ENTITY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Entity'
                        },
                        TEXT: {
                            type: ArgumentType.STRING
                        }
                    }
                },
                {
                    opcode: 'minecraftCommand',
                    blockType: BlockType.COMMAND,
                    text: '/[COMMAND]',
                    arguments: {
                        COMMAND: {
                            type: ArgumentType.STRING,
                            defaultValue: 'demo'
                        }
                    }
                },
                {
                    opcode: 'showTitle',
                    blockType: BlockType.COMMAND,
                    text: 'title [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Welcome!'
                        }
                    }
                },
                {
                    opcode: 'getPlayerItemHeld',
                    blockType: BlockType.REPORTER,
                    text: 'Item held'
                },
                {
                    opcode: 'getLastPlayerJoined',
                    blockType: BlockType.REPORTER,
                    text: 'Last joined Player'
                },
                {
                    opcode: 'getItem',
                    blockType: BlockType.REPORTER,
                    text: '[ITEM]',
                    arguments: {
                        ITEM: {
                            type: ArgumentType.STRING,
                            menu: 'items',
                            defaultValue: 'Apple'
                        }
                    }
                }
            ],
            menus: {
                events: [
                    {
                        value: 'playerJoined',
                        text: 'Player joins'
                    }
                ],
                items: this._getItemNames()
            },
            // translations
            translation_map: {
                fr: {
                },
                de: {
                },
                nl: {
                    // 'whenEvent': 'Als [EVENT]',
                    // 'events_playerJoined': 'Speler joined',
                    // 'items_Nothing' : 'Niks',
                    // 'items_Apple' : 'Appel',
                    // 'items_Beef' : 'Rund',
                    // 'items_Beetroot' : 'Bietje',
                    // 'items_Boat' : 'Boot',
                    // 'items_Book' : 'Boek',
                    // 'items_Bow' : 'Boog',
                    // 'items_Bowl' : 'Schaal',
                    // 'items_Bread' : 'Brood',
                    // 'items_Cactus' : 'Kactus',
                    // 'items_Cake' : 'Cake',
                    // 'items_Carrot' : 'Wortel',
                    // 'items_Cauldron' : 'Cauldron',
                    // 'items_Chicken' : 'Kip',
                    // 'items_Clock' : 'Klok',
                    // 'items_Cookie' : 'Koekje'

                }
            }
        };
    }

    _getItemNames () {
        return Object.keys(storeys.ItemType).map(name => ({
            text: name,
            value: name
        }));
    }

    whenEvent (event) {
        const was = this.eventsReceived[event];
        this.eventsReceived[event] = false;
        return was || false;
    }

    _whenCondition (method, ...args) {
        const eventName = method + args;
        if (!this.registeredConditions.has(eventName)) {
            this.registeredConditions.add(eventName);
            this._onConnect.then(() =>
                this.minecraft[method].apply(this.minecraft, args).then(register => {
                    register.on().subscribe(data => {
                        const loggedInPlayer = this.effectedPlayer;
                        this.effectedPlayer = data.playerUUID;
                        setTimeout(() => {
                            this.effectedPlayer = loggedInPlayer;
                        }, 2000);
                        this.eventsReceived[eventName] = true;
                    });
                })
            );
        }
        return this.whenEvent(eventName);
    }

    whenEntity (args) {
        return this._whenCondition('whenEntityRightClicked', args.ENTITY);
    }

    whenInside (args) {
        return this._whenCondition('whenInside', this.effectedPlayer, args.NAME);
    }

    whenCommand (args) {
        return this._whenCondition('whenCommand', args.COMMAND);
    }

    getPlayerItemHeld () {
        this._onConnect.then(() => this.minecraft.getItemHeld(this.effectedPlayer, storeys.HandType.MainHand));
    }

    getLastPlayerJoined () {
        return this.playerLastJoined;
    }

    getItem (args) {
        return args.ITEM;
    }

    narrate (args) {
        this._onConnect.then(() => this.minecraft.narrate(this.effectedPlayer, args.ENTITY, args.TEXT).then(
            () => log('narrate called'), err => log('error:', err))
        );
    }

    minecraftCommand (args) {
        this._onConnect.then(() => this.minecraft.runCommand(this.effectedPlayer, args.COMMAND).then(
            () => log('command called'), err => log('error:', err))
        );
    }

    showTitle (args) {
        this._onConnect.then(() => this.minecraft.showTitle(this.effectedPlayer, args.TEXT).then(
            () => log('showTitle called'), err => log('error:', err))
        );
    }
}

module.exports = Minecraft;
