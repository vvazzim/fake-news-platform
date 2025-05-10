function Get-DirectoryTree {
    param (
        [string]$Path = ".",
        [string[]]$Exclude = @("node_modules", "venv", "build", "dist", ".git", ".cache", "__pycache__", "logs", "coverage")
    )

    Get-ChildItem -Recurse -Directory $Path | Where-Object {
        foreach ($excl in $Exclude) {
            if ($_.FullName -like "*\$excl*") { return $false }
        }
        return $true
    } | Format-Table FullName -AutoSize
}

Get-DirectoryTree | Out-File project_structure.txt
