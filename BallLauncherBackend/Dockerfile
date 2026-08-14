FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY BallLauncherBackend/BallLauncherApi.csproj BallLauncherBackend/
RUN dotnet restore BallLauncherBackend/BallLauncherApi.csproj

COPY BallLauncherBackend/ BallLauncherBackend/

WORKDIR /src/BallLauncherBackend

RUN dotnet publish BallLauncherApi.csproj \
    --configuration Release \
    --output /app/publish \
    --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 10000

CMD ["sh", "-c", "dotnet BallLauncherApi.dll --urls http://0.0.0.0:${PORT:-10000}"]