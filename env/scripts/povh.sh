# Script de synchronisation vers OVH 
# usage : ./povh.sh [wwwtest|wwwprd]

cible=${1:-"wwwtest"}

echo "Synchronisation OVH --${cible}--"
echo 
for rep in public sqldb backend vendor tmp; do
    local="$HOME/perso/wwwdaldo/${rep}"
    remote="OVH:/${cible}/daldo/${rep}"
    if [ ! -d "$local" ]; then
        echo "Le repertoire $local n'existe pas, je passe"
        continue
    fi
    echo "Synchro de ${local} vers ${remote}"
    rclone sync --progress ${local} ${remote}
done
echo "bye..."